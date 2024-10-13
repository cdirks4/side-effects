import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    // Create a filename based on the current timestamp
    const filename = `email_data_${Date.now()}.json`;
    const filePath = path.join(process.cwd(), "data", filename);

    // Write the data to a JSON file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    console.log(`Data written to file: ${filename}`);

    // Return success response
    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data: ", error);

    // Return error response
    return NextResponse.json(
      { message: "Failed to save data", error: (error as Error).message },
      { status: 500 }
    );
  }
}
