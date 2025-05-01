import { WEBSITE_NAME } from "@/actions/actionTypes";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ResponseData = {
  message?: string;
  error?: string;
};
interface EmailPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text, html } = req.body as EmailPayload;
  if (!to || !subject || !html) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  res.status(200).json({ message: "Email is being processed" });
  setTimeout(async () => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `${WEBSITE_NAME} <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log("✅ Email sent successfully");
    } catch (err: any) {
      console.error("❌ Email error:", err);
    }
  }, 2000); // 10 seconds delay
}
