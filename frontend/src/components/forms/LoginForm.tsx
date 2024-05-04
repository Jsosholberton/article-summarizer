'use client'
import Button from "@/components/atoms/Button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"
import {getUser} from "@/auth/getUser";

export default function LoginForm() {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
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

  /**
   * @function saveToken - Function to save the token in the local storage.
   * @param token - The token to save.
   */
  const saveToken = (token: string) => {
    localStorage.setItem('token', token)
  }

  /**
   * @function handleLogin - Function to handle the login of the user.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
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

      if (data.error) return setError(data.msg)

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
      onSubmit={handleLogin}
      className='flex w-full flex-col items-center justify-around gap-4 rounded-xl px-10 py-16'>
      <h3 className='text-2xl font-light text-white'>Summarizer</h3>
      <label htmlFor="email" className='flex flex-col'>Email
        <input type='email' name='email' required className='rounded px-2 py-1 text-black' value={email}
               onChange={e => setEmail(e.target.value)}/>
      </label>
      <label htmlFor="password" className='flex flex-col'>Password
        <input type='password' required name='password' className='rounded px-2 py-1 text-black' value={password}
               onChange={e => setPassword(e.target.value)}/>
      </label>
      <Button type='submit' loading={loading}>Login</Button>
      {error && <p className='text-red-600'>{error}</p>}
    </form>
  )
}