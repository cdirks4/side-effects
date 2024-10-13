"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DrugData {
  drug_name: string;
  ndc_codes: string;
  packager: string;
}

export default function GetStarted() {
  const { isSignedIn, user } = useUser();
  const [drug, setDrug] = useState("");
  const [concern, setConcern] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [partialData, setPartialData] = useState<DrugData[]>([]);
  const [reviewText, setReviewText] = useState<string | null>(null);
  const [linkData, setLinkData] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [isSignedIn, user]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Drug Variations for Given Search",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Drug Names",
        },
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      setError("Please sign in to submit your query.");
      return;
    }
    if (!drug || !concern) {
      setError("Please fill out all fields.");
      return;
    }
    setFetchLoading(true);
    setChartLoading(true);
    setError("");
    setShowEmailForm(false);
    setShowChart(false);
    setPartialData([]);
    setReviewText(null);
    setLinkData(null);

    try {
      const queryParams = new URLSearchParams({
        drug_name: drug,
        drug_symptoms: concern,
      });
      const response = await fetch(
        `/api/drug-search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Check for review_text and link_data
      if (data.review_text) {
        setReviewText(data.review_text);
      }
      if (data.link_data) {
        setLinkData(data.link_data);
      }

      // Process the data from multiple APIs
      const originalApiData = data.originalApi?.data || [];
      const mockApi1Data = data.mockApi1?.data || [];
      const mockApi2Data = data.mockApi2?.data || [];

      const allData = [...originalApiData, ...mockApi1Data, ...mockApi2Data];

      if (allData.length > 0) {
        updateChartData(allData);
        setShowChart(true);
        // Send email with the results
        await sendEmail(allData);
      } else {
        throw new Error("No data available");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while fetching data. We'll notify you when we have more information."
      );
      setShowEmailForm(true);
    } finally {
      setFetchLoading(false);
      setChartLoading(false);
    }
  };

  const updateChartData = (newData: DrugData[]) => {
    setPartialData((prevData) => [...prevData, ...newData]);
    const drugCounts = newData.reduce((acc, curr) => {
      acc[curr.drug_name] = (acc[curr.drug_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedDrugNames = Object.keys(drugCounts)
      .sort((a, b) => drugCounts[b] - drugCounts[a])
      .slice(0, 10);

    setChartData({
      labels: sortedDrugNames,
      datasets: [
        {
          label: "Number of Variations",
          data: sortedDrugNames.map((name) => drugCounts[name]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const sendEmail = async (data: DrugData[]) => {
    setEmailLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
          drug,
          concern,
          data: data.slice(0, 10), // Send top 10 results
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save results. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    setEmailLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          drug,
          concern,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save email data");
      }

      setEmailSubmitted(true);
      setShowEmailForm(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit email. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E5E5] to-[#F0F0F0] text-gray-800 font-montserrat">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-semibold text-black mb-8 text-center">
          Get Started
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          {isSignedIn ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="drug"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Medication Name
                </label>
                <input
                  type="text"
                  id="drug"
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                  placeholder="Enter medication name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="concern"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Side Effect
                </label>
                <input
                  type="text"
                  id="concern"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                  placeholder="Describe the side effect"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                  fetchLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={fetchLoading}
              >
                {fetchLoading ? "Processing..." : "Submit"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-4">Please sign in to submit your query.</p>
              <SignInButton mode="modal">
                <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          {showEmailForm && !emailSubmitted && (
            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                placeholder="Enter your email for updates"
                required
              />
              <button
                type="submit"
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                  emailLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={emailLoading}
              >
                {emailLoading ? "Submitting..." : "Submit Email"}
              </button>
            </form>
          )}

          {emailSubmitted && (
            <p className="text-green-500 text-sm text-center mt-4">
              Thank you! We&apos;ll notify you when we have more information.
            </p>
          )}
        </div>

        {showChart && chartData && (
          <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-black mb-6 text-center">
              Side Effects Histogram
            </h2>
            {chartLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )}
          </div>
        )}

        {reviewText && (
          <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-black mb-6 text-center">
              Review Summary
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{reviewText}</p>
            {linkData && (
              <div className="mt-4">
                <a
                  href={linkData}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  More Information
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
