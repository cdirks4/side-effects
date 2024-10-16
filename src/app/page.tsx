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
import { motion, useAnimation } from "framer-motion";
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

  const [userGroupsRef, userGroupsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px", // This will start the animation earlier
  });

  const controls = useAnimation();

  useEffect(() => {
    if (userGroupsInView) {
      controls.start("visible");
    }
  }, [userGroupsInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

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

  const userGroups = [
    {
      title: "Everyday Users Experiencing Side Effects",
      icon: (
        <UserGroupIcon className="h-12 w-12 md:h-16 md:w-16 text-indigo-600 mx-auto" />
      ),
      color: "indigo",
      description:
        "Individuals currently dealing with side effects and seeking additional information from both official sources and real-world reports.",
      goal: "To quickly find reliable information about side effects, combining medical documentation with user experiences to understand if their experiences are common or rare.",
    },
    {
      title: "Speculative Users",
      icon: (
        <MagnifyingGlassIcon className="h-12 w-12 md:h-16 md:w-16 text-purple-600 mx-auto" />
      ),
      color: "purple",
      description:
        "Individuals seeking a deeper understanding of potential side effects before starting a new medication or evaluating current treatments.",
      goal: "To make well-informed decisions about treatments by understanding potential side effects through a mix of official data and user-reported experiences.",
    },
    {
      title: "Patients Feeling Uncertain",
      icon: (
        <QuestionMarkCircleIcon className="h-12 w-12 md:h-16 md:w-16 text-blue-600 mx-auto" />
      ),
      color: "blue",
      description:
        "Users looking for clarity when traditional sources haven&apos;t provided sufficient answers about their side effects.",
      goal: "To gain a broader perspective by accessing relevant data and similar experiences reported by others, providing more context to their situation.",
    },
    {
      title: "Researchers and Healthcare Professionals",
      icon: (
        <AcademicCapIcon className="h-12 w-12 md:h-16 md:w-16 text-green-600 mx-auto" />
      ),
      color: "green",
      description:
        "While primarily serving patients, our platform also benefits researchers and healthcare professionals by uncovering underreported side effects.",
      goal: "To access a comprehensive dataset that helps improve patient care, identify trends, and inform future research by supplementing official data with real-world experiences.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E5E5] to-[#F0F0F0] text-gray-800 font-montserrat">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-26 px-4 md:px-8 overflow-hidden">
        {/* Cloud Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
          >
            <Image
              src="/assets/banner_cloud.png"
              alt="Cloud Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="object-right-bottom md:object-center lg:object-right-bottom"
            />
          </motion.div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-row  items-center justify-between">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-6 font-montserrat">
                Discover Comprehensive Side Effect Insights with AI
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
                &ldquo;Am I the Only One&rdquo; leverages AI to analyze both
                official medical data and user-reported experiences, providing a
                more complete understanding of medication side effects.
              </p>
              <Link href="/get-started" className="inline-block">
                <motion.span
                  className="gap-4 btn-xl btn-purple group/btn btn-border-dark rounded-full bg-indigo-600 text-white font-semibold text-base md:text-lg py-3 px-6 md:px-8 hover:bg-indigo-700 transition duration-300 cursor-pointer flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Woman Image */}
        <motion.div
          className="absolute top-0 right-0 w-full h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-full h-full md:h-3/4 lg:h-full">
            <Image
              src="/assets/banner_woman.png"
              alt="Woman"
              layout="fill"
              objectFit="contain"
              objectPosition="right bottom"
            />
          </div>
        </motion.div>
      </section>
      {/* How Does It Work? Section */}
      <motion.section
        ref={aiAnalysisRef}
        initial={{ opacity: 0, y: 50 }}
        animate={aiAnalysisInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white py-12 md:py-20 shadow-lg"
      >
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={aiAnalysisInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl text-black mb-8 md:mb-12 font-semibold"
          >
            HOW DOES IT WORK?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Step 1 */}
            <motion.div
              key={1}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aiAnalysisInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full p-4 mb-4">
                <Image
                  src="/assets/step0.png"
                  alt="Step 1"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">STEP 1</h3>
              <p className="text-sm md:text-base text-gray-700 font-light">
                I have a symptom that could be a side effect.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              key={2}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aiAnalysisInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full p-4 mb-4">
                <Image
                  src="/assets/step1.png"
                  alt="Step 2"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">STEP 2</h3>
              <p className="text-sm md:text-base text-gray-700 font-light">
                Enter the drug name and symptom you&apos;re experiencing.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              key={3}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aiAnalysisInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full p-4 mb-4">
                <Image
                  src="/assets/step2.png"
                  alt="Step 3"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">STEP 3</h3>
              <p className="text-sm md:text-base text-gray-700 font-light">
                Our AI systems check thousands of verified and unreported side
                effects.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              key={4}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aiAnalysisInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full p-4 mb-4">
                <Image
                  src="/assets/step3.png"
                  alt="Step 4"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">STEP 4</h3>
              <p className="text-sm md:text-base text-gray-700 font-light">
                Receive your information by email in minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Revealing Uncommon Side Effects Section */}
      <motion.section
        ref={uncommonSideEffectsRef}
        initial={{ opacity: 0 }}
        animate={uncommonSideEffectsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 py-12 md:py-16 shadow-md"
      >
        <div className="container mx-auto text-center px-4 py-2">
          <h2 className="text-2xl md:text-4xl mb-6 md:mb-8 text-black font-semibold">
            Revealing Uncommon Side Effects
          </h2>
          <p className="text-base md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto text-gray-700">
            When you experience unexpected symptoms from a medication, our tool
            helps you quickly validate if others have similar experiences. Seek
            medical advice sooner, potentially preventing long-term
            complications.
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-black">
                Why It Matters
              </h3>
              <ul className="text-left list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
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
            <div
              ref={chartRef}
              className="relative h-64 w-64 sm:h-80 sm:w-80 mx-auto"
            >
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
      </motion.section>
      {/* User Groups Section */}
      <motion.section
        ref={userGroupsRef}
        variants={containerVariants}
        initial="hidden"
        animate={userGroupsInView ? "visible" : "hidden"} // Change this line
        className="py-12 md:py-16 bg-gray-50 shadow-md overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl text-black mb-6 md:mb-8 font-semibold"
          >
            Who Can Benefit From Our Platform?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto"
          >
            Our platform is designed to assist a variety of users—from
            individuals experiencing side effects to healthcare professionals
            seeking deeper insights. Discover how you can benefit from our
            comprehensive side effect analysis.
          </motion.p>
          <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {" "}
            {/* Change this line */}
            {userGroups.map((group, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl "
              >
                <div
                  className={`p-2 md:p-4 ${
                    group.color === "indigo"
                      ? "bg-indigo-100"
                      : group.color === "purple"
                      ? "bg-purple-100"
                      : group.color === "blue"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }`}
                >
                  {group.icon}
                </div>
                <div className="p-2 md:p-6 text-left">
                  <h3
                    className={`text-sm md:text-2xl font-semibold mb-1 md:mb-4 ${
                      group.color === "indigo"
                        ? "text-indigo-900"
                        : group.color === "purple"
                        ? "text-purple-900"
                        : group.color === "blue"
                        ? "text-blue-900"
                        : "text-green-900"
                    }`}
                  >
                    {group.title}
                  </h3>
                  <p className="text-xs md:text-lg text-gray-700 mb-1 md:mb-4">
                    {group.description}
                  </p>
                  <div
                    className={`p-1 md:p-4 rounded-lg ${
                      group.color === "indigo"
                        ? "bg-indigo-50"
                        : group.color === "purple"
                        ? "bg-purple-50"
                        : group.color === "blue"
                        ? "bg-blue-50"
                        : "bg-green-50"
                    }`}
                  >
                    <p
                      className={`text-xs md:text-lg ${
                        group.color === "indigo"
                          ? "text-indigo-900"
                          : group.color === "purple"
                          ? "text-purple-900"
                          : group.color === "blue"
                          ? "text-blue-900"
                          : "text-green-900"
                      }`}
                    >
                      <span className="font-bold">Goal:</span> {group.goal}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-6 md:py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">
            &copy; 2024 Am I the Only One. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
