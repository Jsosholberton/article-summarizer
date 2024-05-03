import React from "react";
import Link from "next/link";
import SignUpForm from "@/components/forms/SignUpForm";

export default function signup() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center bg-black justify-center gap-5 sm:p-24 px-12 py-20">
      <SignUpForm/>
      <Link href='/auth/login' className='w-full text-center font-light'>You already have a account?</Link>
    </main>
  );
}