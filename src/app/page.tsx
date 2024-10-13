"use client";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useState, useEffect, useRef } from "react";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [chartRef, chartInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aiAnalysisRef, aiAnalysisInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [uncommonSideEffectsRef, uncommonSideEffectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      duration: 2000,
    },
    plugins: {
      legend: {
        position: "bottom" as const, // Specify the position as a literal type
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    cutout: "70%",
    onHover: (event, elements) => {
      if (event.native && event.native.target instanceof HTMLElement) {
        event.native.target.style.cursor = elements.length
          ? "pointer"
          : "default";
      }
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        setSelectedSegment(label as string);
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E5E5] to-[#F0F0F0] text-gray-800 font-montserrat">
      {/* Hero Section */}
      <section className="relative py-16 px-4 md:px-8 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="font-semibold text-2xl sm:text-4xl md:text-5xl text-black mb-6 font-montserrat">
                Discover Comprehensive Side Effect Insights with AI
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
                &ldquo;Am I the Only One&rdquo; leverages AI to analyze both
                official medical data and user-reported experiences, providing a
                more complete understanding of medication side effects.
              </p>
              <Link href="/get-started" className="inline-block">
                <span className="gap-4 btn-xl btn-purple group/btn btn-border-dark rounded-full bg-indigo-600 text-white font-semibold text-base md:text-lg py-3 px-8 hover:bg-indigo-700 transition duration-300 cursor-pointer flex items-center">
                  Get Started{" "}
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
          </div>
        </div>

        {/* Cloud Image */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <Image
            src="/assets/banner_cloud.png"
            alt="Cloud Background"
            layout="fill"
            objectFit="cover"
            className="animate-slide-left"
          />
        </div>

        {/* Woman Image */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="relative w-full h-full md:h-3/4 lg:h-full">
            <Image
              src="/assets/banner_woman.png"
              alt="Woman"
              layout="fill"
              objectFit="contain"
              objectPosition="right bottom"
              className="animate-fade-in"
            />
          </div>
        </div>
      </section>
      {/* AI-Powered Analysis Section */}
      <section
        ref={aiAnalysisRef}
        className={`bg-white py-20 shadow-lg transition-opacity duration-1000 ease-in-out ${
          aiAnalysisInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl text-black mb-6 font-semibold">
            AI-Powered Analysis of All Data Sources
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Our AI scours both official documentation and forums like Reddit to
            bring you insights on side effects. We combine verified data with
            real-world user reports to help you understand the complete picture
            of how a medication may affect you.
          </p>
        </div>
      </section>

      {/* Revealing Uncommon Side Effects Section */}
      <section
        ref={uncommonSideEffectsRef}
        className={`bg-gray-100 py-16 shadow-md transition-opacity duration-1000 ease-in-out ${
          uncommonSideEffectsInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl mb-8 text-black font-semibold">
            Revealing Uncommon Side Effects
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-700">
            When you experience unexpected symptoms from a medication, our tool
            helps you quickly validate if others have similar experiences. Seek
            medical advice sooner, potentially preventing long-term
            complications.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-black">
                Why It Matters
              </h3>
              <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
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
            <div ref={chartRef} className="relative h-80 w-80 mx-auto">
              {chartInView && (
                <>
                  <Doughnut
                    data={data}
                    options={options}
                    className="animate-fade-in"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold text-black animate-fade-in">
                      30.8%
                    </div>
                  </div>
                </>
              )}
              <p className="mt-4 text-sm text-gray-600">
                30.8% of new drugs had significant side effects discovered after
                market release (2001-2010).
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* User Groups Section */}
      <section className="py-16 bg-gray-50 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl text-black mb-8 font-semibold">
            Who Can Benefit From Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card for Everyday Users */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              <div className="bg-indigo-100 p-4">
                <UserGroupIcon className="h-16 w-16 text-indigo-600 mx-auto" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                  Everyday Users Experiencing Side Effects
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Individuals currently dealing with side effects and seeking
                  additional information from both official sources and
                  real-world reports.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-lg text-indigo-900">
                    <span className="font-bold">Goal:</span> To quickly find
                    reliable information about side effects, combining medical
                    documentation with user experiences to understand if their
                    experiences are common or rare.
                  </p>
                </div>
              </div>
            </div>

            {/* Card for Speculative Users */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              <div className="bg-purple-100 p-4">
                <MagnifyingGlassIcon className="h-16 w-16 text-purple-600 mx-auto" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-purple-900 mb-4">
                  Speculative Users
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Individuals seeking a deeper understanding of potential side
                  effects before starting a new medication or evaluating current
                  treatments.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-lg text-purple-900">
                    <span className="font-bold">Goal:</span> To make
                    well-informed decisions about treatments by understanding
                    potential side effects through a mix of official data and
                    user-reported experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Card for Patients Feeling Uncertain */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              <div className="bg-blue-100 p-4">
                <QuestionMarkCircleIcon className="h-16 w-16 text-blue-600 mx-auto" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                  Patients Feeling Uncertain
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Users looking for clarity when traditional sources haven't
                  provided sufficient answers about their side effects.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg text-blue-900">
                    <span className="font-bold">Goal:</span> To gain a broader
                    perspective by accessing relevant data and similar
                    experiences reported by others, providing more context to
                    their situation.
                  </p>
                </div>
              </div>
            </div>

            {/* Card for Researchers and Healthcare Professionals */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              <div className="bg-green-100 p-4">
                <AcademicCapIcon className="h-16 w-16 text-green-600 mx-auto" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-green-900 mb-4">
                  Researchers and Healthcare Professionals
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  While primarily serving patients, our platform also benefits
                  researchers and healthcare professionals by uncovering
                  underreported side effects.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-lg text-green-900">
                    <span className="font-bold">Goal:</span> To access a
                    comprehensive dataset that helps improve patient care,
                    identify trends, and inform future research by supplementing
                    official data with real-world experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Am I the Only One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
