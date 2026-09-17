import crypto from "node:crypto";
import { env } from "@/lib/env";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits recommended for GCM
const AUTH_TAG_LENGTH = 16; // 128 bits

/**
 * Derives a 32-byte Buffer key from the environment secret or custom hex string.
 */
function getKeyBuffer(customKey?: string): Buffer {
  const rawKey = customKey || env.CONTENT_ENCRYPTION_KEY;
  if (!rawKey) {
    throw new Error("CONTENT_ENCRYPTION_KEY is required for encryption operations.");
  }

  // If hex string of 64 chars, parse as hex; otherwise hash with SHA-256 to ensure 32 bytes
  if (rawKey.length === 64 && /^[0-9a-fA-F]+$/.test(rawKey)) {
    return Buffer.from(rawKey, "hex");
  }

  return crypto.createHash("sha256").update(rawKey).digest();
}

/**
 * Encrypts any structured data (object, string, array) using AES-256-GCM.
 * Output format: `<iv_hex>:<auth_tag_hex>:<ciphertext_hex>`
 */
export function encryptContent(data: unknown, customKey?: string): string {
  const key = getKeyBuffer(customKey);
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const plaintext = typeof data === "string" ? data : JSON.stringify(data);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Decrypts AES-256-GCM ciphertext payload.
 * Verifies authenticity before returning the parsed JSON object.
 */
export function decryptContent<T = unknown>(encryptedPayload: string, customKey?: string): T {
  const parts = encryptedPayload.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid ciphertext format. Expected <iv>:<tag>:<ciphertext>");
  }

  const [ivHex, authTagHex, ciphertextHex] = parts;
  const key = getKeyBuffer(customKey);
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertextHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  try {
    return JSON.parse(decrypted) as T;
  } catch {
    return decrypted as unknown as T;
  }
}
