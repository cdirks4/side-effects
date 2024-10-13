"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GetStarted() {
  const [drug, setDrug] = useState("");
  const [concern, setConcern] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ drug, concern });
    router.push(
      `/results?drug=${encodeURIComponent(drug)}&concern=${encodeURIComponent(
        concern
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-200 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg p-6 sm:p-10">
          <h1 className="text-xl sm:text-3xl font-bold text-center text-indigo-900 mb-6">
            What medication side effect are you curious about?
          </h1>
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
                className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base"
                placeholder="Enter medication name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="concern"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Concern or Side Effect
              </label>
              <textarea
                id="concern"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-base"
                rows={4}
                placeholder="Describe your concern or side effect"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Search for Insights
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
