"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Bar } from "react-chartjs-2";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import reactionData from "../../../data/reaction_frequency_table.json";

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
  const [reviewText, setReviewText] = useState<string | null>(null);
  const [linkData, setLinkData] = useState<string | null>(null);
  const [redditSearchResult, setRedditSearchResult] = useState<any>(null);

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
        text: "Top 10 Side Effects",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Frequency",
        },
      },
      x: {
        title: {
          display: true,
          text: "Side Effects",
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
    setReviewText(null);
    setLinkData(null);
    setEmailSubmitted(false);
    setRedditSearchResult(null);

    try {
      const queryParams = new URLSearchParams({
        drug_name: drug,
        drug_symptoms: concern,
      });

      const [drugSearchResponse, redditSearchResponse] = await Promise.all([
        fetch(`/api/drug-search?${queryParams.toString()}`),
        fetch(`/api/reddit-search?${queryParams.toString()}`),
      ]);

      if (!drugSearchResponse.ok || !redditSearchResponse.ok) {
        throw new Error("One or more API responses were not ok");
      }

      const [drugSearchData, redditSearchData] = await Promise.all([
        drugSearchResponse.json(),
        redditSearchResponse.json(),
      ]);

      // Process drug search data
      if (drugSearchData.review_text) {
        setReviewText(drugSearchData.review_text);
      }
      if (drugSearchData.link_data) {
        setLinkData(drugSearchData.link_data);
      }

      // Create chart data from reaction frequency JSON
      const top10Reactions = reactionData
        .sort((a, b) => b.Frequency - a.Frequency)
        .slice(0, 10);

      const chartData = {
        labels: top10Reactions.map((reaction) => reaction.Reaction),
        datasets: [
          {
            label: "Frequency of Side Effects",
            data: top10Reactions.map((reaction) => reaction.Frequency),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
      setShowChart(false);

      // Process Reddit search data
      setRedditSearchResult(redditSearchData);
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
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800 font-montserrat">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center">
          Get Started
        </h1>
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto mb-12">
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
              <p className="mb-4 text-gray-600">
                Please sign in to submit your query.
              </p>
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
        </div>

        {showChart && chartData && (
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
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

        {redditSearchResult && (
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
              Reddit Search Result
            </h2>
            <p className="text-lg mb-2">
              <span className="font-semibold">Symptom:</span>{" "}
              {redditSearchResult.symptom}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Symptom Present:</span>{" "}
              {redditSearchResult["symptom present or not"]}
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                This data is based on user reports from Reddit and may not be
                medically verified. Always consult with a healthcare
                professional for medical advice.
              </p>
            </div>
          </div>
        )}

        {reviewText && (
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
              Review Summary
            </h2>
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
              <ReactMarkdown>{reviewText}</ReactMarkdown>
            </div>
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

        {showEmailForm && !emailSubmitted && (
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
              Get Notified
            </h2>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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
          </div>
        )}

        {emailSubmitted && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-12"
            role="alert"
          >
            <p className="font-bold">Thank you!</p>
            <p>We'll notify you when we have more information.</p>
          </div>
        )}
      </div>
    </div>
  );
}
