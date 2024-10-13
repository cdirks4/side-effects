import { NextRequest, NextResponse } from "next/server";

const API_URL =
  "https://drug-search-199983032721.us-central1.run.app/drug_search";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const drug_name = searchParams.get("drug_name");
  const drug_symptoms = searchParams.get("drug_symptoms");

  if (!drug_name || !drug_symptoms) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const queryParams = new URLSearchParams({
    drug_name: drug_name,
    drug_symptoms: drug_symptoms,
  });

  try {
    const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("API response was not ok");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching drug data:", error);
    return NextResponse.json(
      { error: "Failed to fetch drug data" },
      { status: 500 }
    );
  }
}
