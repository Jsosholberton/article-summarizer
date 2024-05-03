'use client'

import {SendIcon} from "@/components/Icons";
import {useState} from "react";
import {useRouter} from "next/navigation"
import Loading from "@/components/loaders/Loading";

export default function Chat() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const token = typeof localStorage !== "undefined" ?? localStorage.getItem('token')

  const router = useRouter()

  if (!token) {
    router.push('/')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({url: message})
    })

    const data = await res.json()

    if (data.error) {
      return setError(data.error)
    }

    if (data) return router.push(`/chats/${data._id}`)
  }

  return (
    <div className='w-full bg-neutral-800 flex flex-col px-25 justify-end'>
      <h2 className='text-xl p-4 sm:p-0 sm:text-2xl text-center'>Put the link of the article to start the
        conversation</h2>
      {error && <p className='text-red-600 font-extralight text-center'>{error}</p>}
      {loading && <Loading/>}
      <form
        onSubmit={handleSubmit}
        className='mx-auto my-10 p-25 relative w-full max-w-3xl'>
        <input
          disabled={loading}
          type='url'
          pattern="https?://.*"
          placeholder='Start writing the article link...'
          className='px-10 bg-transparent border border-neutral-600 py-5 w-full rounded-lg placeholder:text-neutral-500'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          disabled={loading}
          className='absolute right-0 text-black h-full px-2'>
          <SendIcon className='h-6 w-6 text-neutral-500 hover:text-neutral-200 transition-colors'/>
        </button>
      </form>
    </div>
  )
}