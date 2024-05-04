// pages/index.js

import Head from 'next/head';
import Link from 'next/link';
import {ParticlesIcon, TrophyIcon} from "@/components/Icons";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <Head>
        <title>Article Summarizer</title>
        <meta name="description" content="Summarize Articles with OpenAI API"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="p-10 flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-8">Article Summarizer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Card */}
          <div className="bg-white p-6 rounded-lg flex flex-col gap-8 items-center justify-center">
            <TrophyIcon className='h-12 w-12 text-black'/>
            <h2 className="text-xl font-semibold text-black">Login</h2>
            <p className="text-gray-700 text-pretty text-center">Already have an account? Log in to access your
              articles.</p>
            <Link href="/auth/login" className="bg-black text-white px-6 py-3 rounded-lg">Login
            </Link>
          </div>
          {/* Signup Card */}
          <div className="bg-white p-6 rounded-lg flex flex-col gap-8 items-center justify-center">
            <ParticlesIcon className='w-12 h-12 text-black'/>
            <h2 className="text-xl font-semibold mb-2 text-black">Sign Up</h2>
            <p className="text-gray-700 text-pretty text-center">Don't have an account yet? Sign up to get started.</p>
            <Link href="/auth/signup" className="mt-4 bg-black text-white px-6 py-3 rounded-lg">Sign Up
            </Link>
          </div>
        </div>
      </main>

      {/*      <footer className="flex items-center justify-center w-full h-24 border-t">
      <p className="text-center">© {new Date().getFullYear()} Article Summarizer. All rights reserved.</p>
      </footer>*/}
    </div>
  );
};

export default Home;
