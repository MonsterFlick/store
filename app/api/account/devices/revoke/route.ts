import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revokeUserDevice } from "@/lib/security/devices";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { deviceId } = await request.json();
  if (!deviceId) {
    return NextResponse.json({ error: "Device ID required" }, { status: 400 });
  }

  const success = await revokeUserDevice(user.id, deviceId);
  if (!success) {
    return NextResponse.json({ error: "Failed to revoke device" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
