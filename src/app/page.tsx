"use client";
import Head from "next/head";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  // Data for the donut chart
  const data = {
    labels: ["Side Effects Found After Release", "No New Side Effects Found"],
    datasets: [
      {
        data: [30.8, 69.2], // 30.8% with side effects found after release, 69.2% without
        backgroundColor: ["#B22222", "#A9A9A9"], // Darker red and grey colors
        hoverBackgroundColor: ["#8B0000", "#808080"], // Even darker hover colors
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    cutout: "70%", // This creates space in the middle of the donut for text
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        setSelectedSegment(label);
      }
    },
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      <Head>
        <title>Discover Comprehensive Side Effect Insights</title>
        <meta
          name="description"
          content="Am I the Only One uses AI to provide a complete understanding of medication side effects by analyzing data from both official sources and real-world user reports."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-red-50 py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-6">
            Discover Comprehensive Side Effect Insights with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-[60vw] mx-auto">
            "Am I the Only One" leverages AI to analyze both official medical
            data and user-reported experiences, providing a more complete
            understanding of medication side effects. Stay informed with our
            powerful, data-driven platform.
          </p>
          <div className="bg-red-600 text-white font-mono text-lg md:text-xl py-4 px-6 rounded-lg mb-6 inline-block shadow-md cursor-pointer hover:bg-red-700 transition duration-300">
            <Link href="/waitlist">
              <span>Explore</span> Side Effect Data
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Link href="/waitlist">
            <span className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 cursor-pointer shadow-lg">
              Join the Waitlist
            </span>
          </Link>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section className="bg-gray-100 py-20 shadow-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-6">
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
      <section className="bg-red-50 py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
            Revealing Uncommon Side Effects
          </h2>
          <p className="text-lg text-gray-700 max-w-[60vw] mx-auto mb-6 text-center">
            When you experience side effects from a drug, you want answers. "Am
            I the Only One" helps you find out if others have reported
            experiencing similar symptoms, enabling you to seek medical advice
            sooner and get the right care, potentially preventing long-term
            issues.
          </p>
          <p className="text-lg text-gray-700 max-w-[60vw] mx-auto mb-6 text-center">
            Even with extensive clinical trials, doctors and pharmaceutical
            companies don&apos;t always know every possible side effect. Many
            side effects become apparent only after a medication is used by a
            larger population.
          </p>

          <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-[400px]">
            <h3 className="text-xl font-semibold text-red-700 mb-4 text-center">
              Side Effects Discovered After Wider Use
            </h3>
            <div className="relative h-60">
              <Doughnut data={data} options={options} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-red-700">30.8%</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              New Drugs: 30.8% had significant side effects discovered after
              release (2001-2010).
            </p>
          </div>
        </div>
      </section>

      {/* User Groups Section */}
      <section className="py-16 bg-gray-200 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-6">
            Who Can Benefit From Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[80vw] mx-auto">
            {/* Card for Everyday Users */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-700 mb-4">
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
              <h3 className="text-2xl font-semibold text-red-700 mb-4">
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
              <h3 className="text-2xl font-semibold text-red-700 mb-4">
                Patients Feeling Uncertain
              </h3>
              <p className="text-lg text-gray-700">
                These users are looking for clarity when traditional sources
                haven’t provided sufficient answers about their side effects.
              </p>
              <p className="text-lg text-gray-700 mt-4">
                <span className="font-bold">Goal:</span> To gain a broader
                perspective by accessing relevant data and similar experiences
                reported by others, providing more context to their situation.
              </p>
            </div>

            {/* Card for Researchers and Healthcare Professionals */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-700 mb-4">
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
      <footer className="bg-gray-50 text-gray-700 py-8 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Am I the Only One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
