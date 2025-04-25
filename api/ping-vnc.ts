import { NowRequest, NowResponse } from "@vercel/node";
import puppeteer from "puppeteer";

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const browser = await puppeteer.launch({
      headless: true, // run in the background (no GUI)
    });
    const page = await browser.newPage();

    // Akses URL VNC
    await page.goto(
      "https://80-idx-test-1745383309201.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev/vnc.html?autoconnect=true&resize=remote",
      {
        waitUntil: "domcontentloaded", // Tunggu sampai halaman dimuat
      }
    );

    // Bisa melakukan tindakan lain jika diperlukan, seperti screenshot atau mengambil informasi.
    await page.screenshot({ path: "screenshot.png" });

    // Tutup browser
    await browser.close();

    // Kirim respons sukses
    res.status(200).send("✅ VNC link successfully opened");
  } catch (error: any) {
    res.status(500).send("❌ Error opening VNC link: " + error.message);
  }
}
