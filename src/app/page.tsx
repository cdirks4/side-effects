import Head from 'next/head';
import GifDisplay from './components/GifDisplay'; // Ensure the path to GifDisplay is correct
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-100">
      <Head>
        <title>AI Version Control Project</title>
        <meta name="description" content="Support our AI-driven version control project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      {/* Hero Section */}
      <section className="bg-gray-800 py-20 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ai Pip: Fix GitHub Repositories Easily
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Join us in building an AI-driven framework that handles version control issues automatically.
          </p>
          <Link href="/waitlist">
            <span className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer shadow-lg">
              Join Our Waitlist
            </span>
          </Link>
        </div>
      </section>
      {/* GIF Section */}
      <section className="bg-gray-700 py-20 shadow-lg">
        <div className="container mx-auto  text-center mt-[-2rem]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
Our Focus          </h1>        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Allowing developers to focus on what they do best: coding.
                    </p>
          <GifDisplay altText="Funny GIF" width={400} height={300} />
        </div>
      </section>
 {/* About Section */}
 <section className="py-20 bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">About Us</h2>
          <p className="text-lg text-gray-400">
            We are a group of developers who have faced the frustration of incompatible dependencies in GitHub repositories. Our mission is to create an AI-driven tool to solve this issue for everyone.
          </p>
        </div>
      </section>
      {/* Support Section */}
      <section className="py-20 bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">How You Can Help</h2>
          <p className="text-lg text-gray-400 mb-6">
            We&apos;re competing with other teams to build this project. Your support helps us rise to the top and secure the resources needed to bring this AI version control tool to life.
          </p>
          <a
            href="https://venmo.com/Connor-Dirks-1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Contribute $10 via Venmo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AI Version Control. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
