import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { email } = await request.json();

  // Configure the transporter using SMTP settings
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services like Yahoo, Outlook, etc.
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail email address
      pass: process.env.GMAIL_PASSWORD, // Your Gmail password or App-specific password
    },
  });

  // Set up email data
  const mailOptions = {
    from: process.env.GMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "Test Email from Nodemailer", // Subject line
    text: "Hello, this is a test email sent from your Next.js app!", // plain text body
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${email}`);

    // Return success response
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email: ", error);

    // Return error response
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
