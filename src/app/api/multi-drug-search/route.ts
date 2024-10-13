import { NextRequest, NextResponse } from "next/server";

const ORIGINAL_API_ENDPOINT =
  "https://drug-search-199983032721.us-central1.run.app/drug_search";

// Mock function to simulate additional API calls
const mockApiCall = async (
  endpoint: string,
  params: URLSearchParams
): Promise<any> => {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 2000 + 1000)
  );

  // Simulate a response
  return {
    data: [
      {
        drug_name: `Mocked ${params.get("drug_name")} from ${endpoint}`,
        ndc_codes: "12345-678-90",
        packager: "Mock Packager",
      },
    ],
  };
};

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

  // Make the original API call
  const originalApiPromise = fetch(
    `${ORIGINAL_API_ENDPOINT}?${queryParams.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .catch((err) => ({ error: err.message }));

  // Make two mock API calls
  const mockApi1Promise = mockApiCall("MockAPI1", queryParams);
  const mockApi2Promise = mockApiCall("MockAPI2", queryParams);

  const [originalApiResult, mockApi1Result, mockApi2Result] = await Promise.all(
    [originalApiPromise, mockApi1Promise, mockApi2Promise]
  );

  // Combine results
  const combinedResults = {
    originalApi: originalApiResult,
    mockApi1: mockApi1Result,
    mockApi2: mockApi2Result,
  };

  return NextResponse.json(combinedResults);
}
