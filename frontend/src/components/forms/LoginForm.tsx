'use client'
import Button from "@/components/atoms/Button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"
import {getUser} from "@/auth/getUser";

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token !== 'undefined' && token !== null) {
      getUser(token).then(user => {
        if (user) {
          router.push('/chats')
        }
      });
    }
  }, [getUser]);

  const saveToken = (token: string) => {
    localStorage.setItem('token', token)
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const data = await response.json()

      if (data.msg) {
        setError(data.msg)
        return
      }

      saveToken(data.token)
      router.push('/chats')
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
      <label htmlFor="email" className='flex flex-col'>Email
        <input type='email' name='email' className='px-2 py-1 text-black rounded' value={email}
               onChange={e => setEmail(e.target.value)}/>
      </label>
      <label htmlFor="password" className='flex flex-col'>Password
        <input type='password' name='password' className='px-2 py-1 text-black rounded' value={password}
               onChange={e => setPassword(e.target.value)}/>
      </label>
      <Button type='button' loading={loading} onClick={handleLogin}>Login</Button>
      {error && <p className='text-red-600'>{error}</p>}
    </form>
  )
}