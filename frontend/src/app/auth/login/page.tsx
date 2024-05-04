import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex bg-black w-full min-h-screen flex-col items-center justify-center sm:p-24 px-12 py-20">
      <LoginForm/>
      <div className='flex flex-col'>
        <Link href='/auth/signup' className='w-full text-center font-light hover:underline'>You dont have a
          account?</Link>
        <Link href='/auth/lost-password' className='w-full text-center font-light hover:underline'>Forgot
          password?</Link>
      </div>
    </main>
  );
}
