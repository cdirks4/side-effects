"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// Mock side effects from forums and official sources
const mockSideEffects = {
  suboxone: {
    official: ["nausea", "dizziness", "constipation", "headache", "sweating"],
    forum: [
      "depression",
      "memory issues",
      "insomnia",
      "anger",
      "skin crawling",
      "mood swings",
    ],
  },
  aspirin: {
    official: ["stomach pain", "heartburn", "drowsiness"],
    forum: ["fatigue", "ringing in ears", "confusion"],
  },
  // Add more drugs as needed
};

export default function GetStarted() {
  const { isSignedIn, user } = useUser();
  // const pathname = usePathname();
  const [drug, setDrug] = useState("");
  const [concern, setConcern] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [normalizedData, setNormalizedData] = useState<string | null>(null);
  const [sideEffects, setSideEffects] = useState<{
    official: string[];
    forum: string[];
  } | null>(null);
  const [error, setError] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const router = useRouter();

  // Use effect to set the email when the user is signed in
  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [isSignedIn, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!drug || !concern) {
      setError("Please fill out both fields.");
      return;
    }

    if (!isSignedIn) {
      setError("Please sign in to submit your query.");
      return;
    }

    // Check if the user's email is verified
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const isEmailVerified =
      user?.primaryEmailAddress?.verification?.status === "verified";

    if (!isEmailVerified) {
      setShowEmailForm(true);
      return;
    }

    // Proceed with the submission
    submitQuery(userEmail);
  };

  const submitQuery = (userEmail: string | undefined) => {
    // Reset the state on submit
    setLoading(true);
    setError("");
    setNormalizedData(null);
    setSideEffects(null);
    setShowEmailForm(false);
    setEmailSubmitted(false);

    // Simulate data normalization process and 50% chance of data availability
    setTimeout(() => {
      const normalized = normalizeInput(drug);
      const isDataAvailable = Math.random() < 0.5;

      if (isDataAvailable) {
        // Show fake data
        const fakeData = mockSideEffects[
          normalized as keyof typeof mockSideEffects
        ] || {
          official: ["No official side effects found"],
          forum: ["No forum side effects found"],
        };
        setNormalizedData(normalized);
        setSideEffects(fakeData);
      } else {
        // Clear data and show email form
        setShowEmailForm(true);
      }

      setLoading(false);
    }, 2000);

    // Here you would typically send the query and email to your backend
    console.log("Submitting query with email:", userEmail);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
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
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      console.log(data.message);
      setEmailSubmitted(true);
      setShowEmailForm(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const normalizeInput = (data: string) => {
    return data.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-100 flex flex-col items-center justify-start p-4">
      <div className="mb-8 mt-4"></div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl flex space-x-4 items-center"
      >
        {/* Medication Name Input */}
        <input
          type="text"
          id="drug"
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          className="flex-grow-0 basis-1/4 px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
          placeholder="Enter medication name"
          required
        />

        {/* Side Effect Input */}
        <input
          type="text"
          id="concern"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          className="flex-grow basis-3/4 px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
          placeholder="Describe the side effect"
          required
        />

        {/* Submit Button */}
        {isSignedIn ? (
          <button
            type="submit"
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Normalizing..." : "Submit"}
            {/* <Image
              src="./assets/am-i-the-only-logo.svg"
              alt="Logo"
              width={24}
              height={24}
            /> */}
          </button>
        ) : (
          <SignInButton mode="modal">
            <button
              type="button"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 368.5 255.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <path d="M297.1,207.9h-150V57.9h150v150Z" />
                  <path d="M222.1,207.9c41.4,0,75-33.6,75-75s-33.6-75-75-75-75,33.6-75,75,33.6,75,75,75Z" />
                  <path d="M53.7,57.9v150h150V57.9H53.7Z" />
                  <path d="M179.9,143.5c-2,0-3.7,1.3-4.4,3.1h-5.9l-2.5-4.2c-.3-.6-1-.9-1.7-.8-.7,0-1.2.5-1.4,1.2l-1.9,5.9-4.6-27.8c-.1-.9-.9-1.5-1.8-1.4-.9,0-1.6.7-1.6,1.6l-3.5,44.2-4.1-23.5c-.1-.8-.8-1.3-1.5-1.4-.8,0-1.5.4-1.8,1.1l-2.5,6.7-1.6-3.3c-.3-.6-.9-1-1.5-1h-14.7c-.9,0-1.7.8-1.7,1.7v14.4c0,9.1-7.4,16.5-16.5,16.5h-.2c-9.1,0-16.5-7.4-16.5-16.5v-29h36.6v-26.1c0-11-8.9-19.9-19.9-19.9h-.2c-11,0-19.9,8.9-19.9,19.9v55.1c0,11,8.9,19.9,19.9,19.9h.2c11,0,19.9-8.9,19.9-19.9v-12.7h11.9l2.9,5.9c.3.6.9,1,1.6,1,.7,0,1.3-.5,1.5-1.1l1.7-4.5,5.4,30.7c.1.8.9,1.4,1.7,1.4h0c.9,0,1.6-.7,1.6-1.6l3.5-43.7,3.5,21c.1.8.8,1.4,1.6,1.4.8,0,1.5-.4,1.8-1.2l2.9-9.1,1.1,1.8c.3.5.9.8,1.5.8h7c.7,1.6,2.3,2.7,4.2,2.7s4.6-2.1,4.6-4.6-2.1-4.6-4.6-4.6Z" />
                </g>
              </svg>
              Sign In to Submit
            </button>
          </SignInButton>
        )}
      </form>

      {loading && (
        <div className="text-center mt-4 text-indigo-600">
          <p>Processing your data...</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}

      {normalizedData && sideEffects && (
        <div className="text-center mt-6">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">
            Normalized Data for {normalizedData}:
          </h2>
          <p className="bg-gray-100 text-gray-800 p-4 rounded-md">
            {normalizedData}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Official Sources Side Effects */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-indigo-900">
                Side Effects (Official Sources)
              </h2>
              <ul className="mt-4 text-gray-700 list-disc list-inside">
                {sideEffects.official.map((effect, index) => (
                  <li key={index} className="capitalize">
                    {effect}
                  </li>
                ))}
              </ul>
            </div>

            {/* Forum Sources Side Effects */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-indigo-900">
                Side Effects (Forums)
              </h2>
              <ul className="mt-4 text-gray-700 list-disc list-inside">
                {sideEffects.forum.map((effect, index) => (
                  <li key={index} className="capitalize">
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {showEmailForm && !emailSubmitted && (
        <div className="text-center mt-6">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">
            {normalizedData
              ? "Data not available yet"
              : "Email Verification Required"}
          </h2>
          <p className="mb-4 text-gray-700">
            {normalizedData
              ? "Submit your email, and we'll notify you when the data is ready."
              : "Please verify your email or provide a valid email address to continue."}
          </p>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col space-y-4 justify-center items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-900 px-3 py-2 rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base w-64"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Submit Email
            </button>
          </form>
        </div>
      )}

      {emailSubmitted && (
        <div className="text-center mt-6 text-green-600">
          <p>
            Thank you! You will be notified when the data becomes available.
          </p>
        </div>
      )}
    </div>
  );
}
