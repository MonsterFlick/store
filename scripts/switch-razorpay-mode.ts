import fs from "fs";
import path from "path";

const envFilePath = path.join(process.cwd(), ".env.local");

function parseEnv(content: string): Record<string, string> {
  const lines = content.split(/\r?\n/);
  const result: Record<string, string> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      result[key] = val;
    }
  }
  return result;
}

function main() {
  const targetMode = process.argv[2]?.toLowerCase();

  if (!fs.existsSync(envFilePath)) {
    console.error("❌ .env.local file not found at:", envFilePath);
    process.exit(1);
  }

  let content = fs.readFileSync(envFilePath, "utf8");
  const envVars = parseEnv(content);

  const liveKeyId = envVars.RAZORPAY_LIVE_KEY_ID || "";
  const liveSecret = envVars.RAZORPAY_LIVE_KEY_SECRET || "";
  const testKeyId = envVars.RAZORPAY_TEST_KEY_ID || "";
  const testSecret = envVars.RAZORPAY_TEST_KEY_SECRET || "";

  if (targetMode === "status") {
    const activeKey = envVars.NEXT_PUBLIC_RAZORPAY_KEY_ID || "UNKNOWN";
    const activeMode = envVars.RAZORPAY_MODE || (activeKey.startsWith("rzp_live") ? "live" : "test");

    console.log("──────────────────────────────────────────");
    console.log(`📌 Razorpay Status: ${activeMode.toUpperCase()} MODE`);
    console.log(`🔑 Active Key ID:   ${activeKey}`);
    console.log("──────────────────────────────────────────");
    return;
  }

  if (targetMode !== "live" && targetMode !== "test") {
    console.log("Usage: npm run razorpay:live | npm run razorpay:test | npm run razorpay:status");
    process.exit(0);
  }

  const isLive = targetMode === "live";
  const newKeyId = isLive ? liveKeyId : testKeyId;
  const newSecret = isLive ? liveSecret : testSecret;

  if (!newKeyId || !newSecret) {
    console.error(`❌ Missing ${targetMode.toUpperCase()} credentials in .env.local.`);
    console.error(`Please ensure RAZORPAY_${targetMode.toUpperCase()}_KEY_ID and RAZORPAY_${targetMode.toUpperCase()}_KEY_SECRET are set.`);
    process.exit(1);
  }

  // Replace or add RAZORPAY_MODE
  if (/^RAZORPAY_MODE=.*/m.test(content)) {
    content = content.replace(/^RAZORPAY_MODE=.*/m, `RAZORPAY_MODE=${targetMode}`);
  } else {
    content = `RAZORPAY_MODE=${targetMode}\n` + content;
  }

  // Replace NEXT_PUBLIC_RAZORPAY_KEY_ID
  if (/^NEXT_PUBLIC_RAZORPAY_KEY_ID=.*/m.test(content)) {
    content = content.replace(/^NEXT_PUBLIC_RAZORPAY_KEY_ID=.*/m, `NEXT_PUBLIC_RAZORPAY_KEY_ID=${newKeyId}`);
  } else {
    content += `\nNEXT_PUBLIC_RAZORPAY_KEY_ID=${newKeyId}`;
  }

  // Replace RAZORPAY_KEY_SECRET
  if (/^RAZORPAY_KEY_SECRET=.*/m.test(content)) {
    content = content.replace(/^RAZORPAY_KEY_SECRET=.*/m, `RAZORPAY_KEY_SECRET=${newSecret}`);
  } else {
    content += `\nRAZORPAY_KEY_SECRET=${newSecret}`;
  }

  fs.writeFileSync(envFilePath, content, "utf8");

  console.log("──────────────────────────────────────────────────────────");
  console.log(`✅ Razorpay successfully switched to ${targetMode.toUpperCase()} MODE!`);
  console.log(`🔑 Active Key ID: ${newKeyId}`);
  console.log("ℹ️  Note: Rebuild and deploy to publish changes to Cloudflare.");
  console.log("──────────────────────────────────────────────────────────");
}

main();
