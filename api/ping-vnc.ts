import { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath:
        (await chrome.executablePath) || "/usr/bin/chromium-browser",
      headless: true,
    });

    const page = await browser.newPage();
    const url =
      "https://80-idx-test-1745383309201.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev/vnc.html?autoconnect=true&resize=remote";

    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("✅ Opened:", url);

    await page.waitForTimeout(10000); // 10 detik
    await browser.close();

    res.status(200).send("✅ VNC visited");
  } catch (err: any) {
    console.error("❌ Error:", err);
    res.status(500).send("❌ Error visiting VNC");
  }
}
