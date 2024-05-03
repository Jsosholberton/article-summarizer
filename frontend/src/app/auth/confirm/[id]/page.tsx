import Link from "next/link";


export default async function Confirm({params}: { params: { id: string } }) {
  const confirmed = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/confirm/${params.id}`, {
    method: 'GET'
  })

  const data = await confirmed.json()

  return (
    <main className="flex w-full min-h-screen flex-col bg-black items-center justify-center gap-5 sm:p-24 px-12 py-20">
      {confirmed && <p className='text-4xl font-light mb-20'>{data.msg}</p>}
      <Link href='/auth/login' className=' font-light px-2 py-1 rounded border'>Login</Link>
    </main>
  );
}
