import { cookies, headers } from "next/headers";
import crypto from "node:crypto";
import { createClient } from "@/lib/supabase/server";

export interface UserDevice {
  id: string;
  user_id: string;
  device_identifier: string;
  device_name: string;
  last_seen_at: string;
  created_at: string;
  revoked_at?: string | null;
}

const DEVICE_COOKIE_NAME = "om_store_device_id";
const MAX_ACTIVE_DEVICES = 2;
const TOUCH_THROTTLE_MS = 15 * 60 * 1000; // 15 minutes throttle to avoid DB write-lock contention

/**
 * Gets or creates a secure client device identifier stored in an HTTP-only cookie.
 * Device cookie is guaranteed and set by middleware on incoming requests.
 */
export async function getOrCreateDeviceIdentifier(): Promise<string> {
  const cookieStore = await cookies();
  const existingId = cookieStore.get(DEVICE_COOKIE_NAME)?.value;

  if (existingId && existingId.length >= 32) {
    return existingId;
  }

  // Fallback generation if called outside middleware
  return crypto.randomBytes(24).toString("hex");
}

/**
 * Derives a human-readable device name from User-Agent.
 */
export async function getDeviceNameFromHeaders(): Promise<string> {
  const headerList = await headers();
  const ua = headerList.get("user-agent") || "Unknown Device";

  let os = "Device";
  if (/windows/i.test(ua)) os = "Windows PC";
  else if (/macintosh|mac os x/i.test(ua)) os = "Mac";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS Device";
  else if (/linux/i.test(ua)) os = "Linux PC";

  let browser = "Browser";
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";

  return `${browser} on ${os}`;
}

/**
 * Validates whether this device is authorized under the 2-device limit policy.
 */
export async function verifyOrCreateDevice(userId: string): Promise<{
  allowed: boolean;
  activeDevices: UserDevice[];
  currentDeviceId: string;
}> {
  const currentDeviceId = await getOrCreateDeviceIdentifier();
  const deviceName = await getDeviceNameFromHeaders();
  const supabase = await createClient();

  // Query active (unrevoked) devices for this user
  const { data: devices, error } = await supabase
    .from("user_devices")
    .select("*")
    .eq("user_id", userId)
    .is("revoked_at", null)
    .order("last_seen_at", { ascending: false });

  // If table is not connected or in dev fallback mode, allow device
  if (error || !devices) {
    return {
      allowed: true,
      activeDevices: [
        {
          id: "dev-fallback-device-1",
          user_id: userId,
          device_identifier: currentDeviceId,
          device_name: deviceName,
          last_seen_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
      ],
      currentDeviceId,
    };
  }

  const activeDevices = devices as UserDevice[];
  const existingDevice = activeDevices.find(
    (d) => d.device_identifier === currentDeviceId
  );

  if (existingDevice) {
    // PERFORMANCE FIX: Only touch last_seen_at if more than 15 minutes have passed
    const lastSeenTime = new Date(existingDevice.last_seen_at).getTime();
    if (Date.now() - lastSeenTime > TOUCH_THROTTLE_MS) {
      try {
        await supabase
          .from("user_devices")
          .update({ last_seen_at: new Date().toISOString() })
          .eq("id", existingDevice.id);
      } catch (err) {
        console.warn("Throttled touch warning:", err);
      }
    }

    return { allowed: true, activeDevices, currentDeviceId };
  }

  // If already at or above limit (2 devices), block and prompt for revocation
  if (activeDevices.length >= MAX_ACTIVE_DEVICES) {
    return { allowed: false, activeDevices, currentDeviceId };
  }

  // Under limit: register new active device
  try {
    await supabase.from("user_devices").insert({
      user_id: userId,
      device_identifier: currentDeviceId,
      device_name: deviceName,
      last_seen_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });
  } catch (insErr) {
    console.warn("Device registration insert warning:", insErr);
  }

  return {
    allowed: true,
    activeDevices: [
      ...activeDevices,
      {
        id: "new-device",
        user_id: userId,
        device_identifier: currentDeviceId,
        device_name: deviceName,
        last_seen_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ],
    currentDeviceId,
  };
}

/**
 * Revokes an active device so another device can take its slot.
 */
export async function revokeUserDevice(userId: string, deviceId: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_devices")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", deviceId)
    .eq("user_id", userId);

  return !error;
}
