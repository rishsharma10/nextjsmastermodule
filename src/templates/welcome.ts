import { WEBSITE_LINK, WEBSITE_NAME } from "@/actions/actionTypes";

export const welcomeTemplate = `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
    <div style="padding: 20px; text-align: center; background-color: #4CAF50; color: white;">
      <h1>Welcome to ${WEBSITE_NAME}!</h1>
    </div>
    <div style="padding: 30px; text-align: center;">
      <h2>Thank You for Joining Us!</h2>
      <p>We're excited to have you on board. Start exploring exclusive deals, the latest collections, and exciting offers curated just for you.</p>
      <a href=${WEBSITE_LINK} style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Shop Now</a>
    </div>
    <div style="padding: 20px; font-size: 12px; color: #777; text-align: center;">
      <p>Need help? Contact our support team anytime.</p>
    </div>
  </div>
</div>`;
