'use client'
import Button from "@/components/atoms/Button";
import {useState} from "react";
import {useRouter} from "next/navigation"

export default function SignUpForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name})
      })
      const data = await response.json()

      if (data.msg) {
        setError(data.msg)
        return
      }
      router.push('/auth/login')
    } catch (e) {
      console.log(e)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className='flex w-full flex-col items-center justify-around gap-4 rounded-xl px-10 py-16'>
      <h3 className='text-2xl font-light text-white'>Summarizer</h3>
      <label htmlFor="name" className='flex flex-col'>Name
        <input type='text' name='name' className='px-2 py-1 text-black rounded' value={name}
               onChange={e => setName(e.target.value)}/>
      </label>
      <label htmlFor="email" className='flex flex-col'>Email
        <input type='email' name='email' className='px-2 py-1 text-black rounded' value={email}
               onChange={e => setEmail(e.target.value)}/>
      </label>
      <label htmlFor="password" className='flex flex-col'>Password
        <input type='password' name='password' className='px-2 py-1 text-black rounded' value={password}
               onChange={e => setPassword(e.target.value)}/>
      </label>
      <Button type='button' loading={loading} onClick={handleSignUp}>Sign up</Button>
      {error && <p className='text-red-600'>{error}</p>}
    </form>
  )
}