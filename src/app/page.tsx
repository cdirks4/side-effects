"use client";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll and set header background

  // Data for the donut chart
  const data = {
    labels: ["Side Effects Found After Release", "No New Side Effects Found"],
    datasets: [
      {
        data: [30.8, 69.2],
        backgroundColor: ["#4f46e5", "#e5e7eb"], // Indigo-600 and Gray-200
        hoverBackgroundColor: ["#4338ca", "#d1d5db"], // Indigo-700 and Gray-300
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    cutout: "70%",
    onClick: (evt: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        setSelectedSegment(label);
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 font-mackinac pt-20">
      {/* Header */}

      {/* Spacer to prevent content from being hidden under the header */}

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl  text-indigo-900 mb-6 font-mackinac">
            Discover Comprehensive Side Effect Insights with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-mackinac">
            &ldquo;Am I the Only One&rdquo; leverages AI to analyze both
            official medical data and user-reported experiences, providing a
            more complete understanding of medication side effects. Stay
            informed with our powerful, data-driven platform.
          </p>
          <Link href="/waitlist" className="inline-block">
            <span className="gap-4 btn-xl btn-purple group/btn btn-border-dark rounded-full bg-indigo-600 text-white font-semibold text-lg md:text-xl py-3 px-8 hover:bg-indigo-700 transition duration-300 cursor-pointer flex items-center">
              Share Your Experience
              <div className="flex items-center opacity-50 group-hover/btn:opacity-100 transition-opacity ml-2">
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  width="0"
                  height="10"
                  fill="currentColor"
                  className="w-0 group-hover/btn:w-[0.7em] h-[0.7em] -mr-[0.7em] ease-out duration-200 transition-all transform-gpu"
                >
                  <path d="M1 9h14a1 1 0 000-2H1a1 1 0 000 2z"></path>
                </svg>
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="size-[0.7em]"
                >
                  <path d="M7.293 1.707L13.586 8l-6.293 6.293a1 1 0 001.414 1.414l7-7a.999.999 0 000-1.414l-7-7a1 1 0 00-1.414 1.414z"></path>
                </svg>
              </div>
            </span>
          </Link>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section className="bg-purple-50 py-20 shadow-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl  text-indigo-900 mb-6">
            AI-Powered Analysis of All Data Sources
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Our AI scours both official documentation and forums like Reddit to
            bring you insights on side effects. We combine verified data with
            real-world user reports to help you understand the complete picture
            of how a medication may affect you.
          </p>
        </div>
      </section>

      {/* Importance of Uncovering Hidden Side Effects */}
      <section className="bg-pink-50 py-16 shadow-md">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl  mb-8 text-indigo-900">
            Revealing Uncommon Side Effects
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            When you experience unexpected symptoms from a medication, our tool
            helps you quickly validate if others have similar experiences. Seek
            medical advice sooner, potentially preventing long-term
            complications.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-900">
                Why It Matters
              </h3>
              <ul className="text-left list-disc list-inside space-y-2">
                <li>
                  Discover side effects not yet reported in clinical trials
                </li>
                <li>
                  Contribute to a growing database of real-world medication
                  effects
                </li>
                <li>Make more informed decisions about your health</li>
                <li>Validate your experiences with real world examples</li>
              </ul>
            </div>
            <div className="relative h-80 w-80 mx-auto">
              <Doughnut data={data} options={options} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold text-indigo-600">30.8%</div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                30.8% of new drugs had significant side effects discovered after
                market release (2001-2010).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Groups Section */}
      <section className="py-16 bg-purple-50 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl  text-indigo-900 mb-6">
            Who Can Benefit From Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[80vw] mx-auto">
            {/* Card for Everyday Users */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-medium text-indigo-900 mb-4">
                Everyday Users Experiencing Side Effects
              </h3>
              <p className="text-lg text-gray-700">
                These are individuals currently dealing with side effects and
                seeking additional information—whether from official sources or
                real-world reports.
              </p>
              <p className="text-lg text-gray-700 mt-4">
                <span className="font-bold">Goal:</span> To quickly find
                reliable information about their side effects, using a
                combination of medical documentation and user experiences, to
                better understand if their experiences are common or rare.
              </p>
            </div>

            {/* Card for Speculative Users */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-medium text-indigo-900 mb-4">
                Speculative Users
              </h3>
              <p className="text-lg text-gray-700">
                Individuals seeking a deeper understanding of potential side
                effects before starting a new medication or as they evaluate
                their current treatments.
              </p>
              <p className="text-lg text-gray-700 mt-4">
                <span className="font-bold">Goal:</span> To make well-informed
                decisions about new or ongoing treatments by understanding
                potential side effects through a mix of official data and
                user-reported experiences.
              </p>
            </div>

            {/* Card for Patients Feeling Uncertain */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-medium text-indigo-900 mb-4">
                Patients Feeling Uncertain
              </h3>
              <p className="text-lg text-gray-700">
                These users are looking for clarity when traditional sources
                haven't provided sufficient answers about their side effects.
              </p>
              <p className="text-lg text-gray-700 mt-4">
                <span className="font-bold">Goal:</span> To gain a broader
                perspective by accessing relevant data and similar experiences
                reported by others, providing more context to their situation.
              </p>
            </div>

            {/* Card for Researchers and Healthcare Professionals */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-medium text-indigo-900 mb-4">
                Researchers and Healthcare Professionals
              </h3>
              <p className="text-lg text-gray-700">
                While the platform primarily serves patients, researchers and
                healthcare professionals can use it to uncover underreported
                side effects, supplementing official data with real-world
                experiences.
              </p>
              <p className="text-lg text-gray-700 mt-4">
                <span className="font-bold">Goal:</span> To access a
                comprehensive dataset that helps improve patient care, identify
                trends, and inform future research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Am I the Only One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
