"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    submitQuery(email);
    setEmail("");
    setEmailSubmitted(true);
    setShowEmailForm(false);
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl flex space-x-4 items-center mt-8"
      >
        {/* Medication Name Input */}
        <input
          type="text"
          id="drug"
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          className="flex-grow-0 basis-1/4 px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base"
          placeholder="Enter medication name"
          required
        />

        {/* Side Effect Input */}
        <input
          type="text"
          id="concern"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          className="flex-grow basis-3/4 px-3 py-2 rounded-md border-2 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base"
          placeholder="Describe the side effect"
          required
        />

        {/* Submit Button */}
        {isSignedIn ? (
          <button
            type="submit"
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Normalizing..." : "Submit"}
          </button>
        ) : (
          <SignInButton mode="modal" afterSignInUrl={pathname}>
            <button
              type="button"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
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
