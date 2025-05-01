import { METHOD_POST } from "@/actions/actionTypes";
import { apiClient } from "@/lib/apiClient";
import {  urlemail } from "@/urls/email";

interface typeProps {
  to: string;
  subject: string;
  html: string;
}

export const emailServices = async (to:string, subject:string, html:string) => {
  const payload = {
    to,
    subject,
    html,
  };
  try {
    const apiRes = await apiClient(urlemail.sendEmail, METHOD_POST, payload);
    return apiRes;
  } catch (error) {
    return error;
  }
};
