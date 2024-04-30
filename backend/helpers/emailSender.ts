import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailData {
  email: string;
  name: string;
  token: string;
}

export const emailReg = async (data: EmailData) => {
  const {email, name, token} = data;

  const transport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_PASS!
    },
  });

  await transport.sendMail({
    from: '"Article Summarizer - Admin" <correo@articleSummarizer.com>',
    to: email,
    subject: "Article Summarizer - Confirm your account",
    text: "Confirm your account on Article Summarizer",
    html: `
      <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">Hi: ${name} confirm your account on Article Summarizer</p>
      <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">Your account is almost ready. You just have to confirm it by clicking the link below:</p>
      <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;"><a href="${process.env.FRONTEND_URL!}confirm/${token}" style="text-decoration: none; color: #007bff;">Confirm my account</a></p>
      <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">If you didn't create this account, you can ignore this message.</p>
    `
  });
};

interface EmailDataPwd {
  email: string;
  name: string;
  token: string;
}

export const emailPwd = async (data: EmailDataPwd) => {
  const {email, name, token} = data;
  const transport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_PASS!,
    },
  });

  await transport.sendMail({
    from: '"Article Summarizer - Admin" <correo@articleSummarizer.com>',
    to: email,
    subject: "Article Summarizer - Confirm your account",
    text: "Restore your password on Article Summarizer",
    html: `<p>Hi: ${name} restore your password from your account on Article Summarizer</p>
      <p>Follow the next link to restore your password:
      <a href="${process.env.FRONTEND_URL!}lost-password/${token}">Restore</a> </p>
      <p>If you didn't restore the password, you can ignore the message</p>
      `
  });
};