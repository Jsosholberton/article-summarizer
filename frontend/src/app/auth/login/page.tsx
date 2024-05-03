import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center bg-black gap-5 sm:p-24 px-12 py-20">
      <LoginForm/>
      <Link href='/auth/signup' className='w-full text-center font-light'>You dont have a account?</Link>
    </main>
  );
}
