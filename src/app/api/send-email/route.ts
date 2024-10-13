import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  // Here you would typically send an actual email
  // For now, we'll just log it and return a success message
  console.log(`Mock email sent to: ${email}`);

  // Simulate a slight delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(
    { message: "Email sent successfully" },
    { status: 200 }
  );
}
