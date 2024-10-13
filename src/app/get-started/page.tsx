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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState<any>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

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
    setLoading(true);
    setChartLoading(true);
    setError("");
    setShowEmailForm(false);

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

      // Process the data and update the chart
      if (
        data &&
        data.data &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        const drugData: DrugData[] = data.data;
        const drugCounts = drugData.reduce((acc, curr) => {
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
        setShowChart(true);
      } else {
        setShowEmailForm(true);
        setError(
          "No data available for the given drug and symptom. We&apos;ll notify you when we have more information."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
      setChartLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, drug, concern }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setEmailSubmitted(true);
      setShowEmailForm(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit email. Please try again.");
    } finally {
      setLoading(false);
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
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
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
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Email"}
              </button>
            </form>
          )}

          {emailSubmitted && (
            <p className="text-green-500 text-sm text-center mt-4">
              Thank you! We&apos;ll notify you when we have more information.
            </p>
          )}
        </div>

        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-black mb-6 text-center">
            Side Effects Histogram
          </h2>
          {chartLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
          ) : showChart && chartData ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500">
              No data available yet. Please submit your query to see results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
