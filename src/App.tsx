// components
import { useState } from 'react'
import VerificationCodeInput from './components/VerificationCodeInput'

export default function App() {
  const [code, setCode] = useState('')

  function onChange(item: string) {
    setCode(item)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen gap-8'>
      <h1>Enter or paste a code here</h1>
      <VerificationCodeInput length={6} onChange={onChange} />

      <div
        className={`${
          code.length > 0 ? 'opacity-100' : 'opacity-0'
        } flex w-full gap-4 h-16 justify-center items-center mt-16 transition duration-150`}
      >
        <label
          htmlFor='code'
          className='flex justify-end items-center text-sm font-medium text-gray-600'
        >
          This is a code:
        </label>

        <div id='code' className='flex text-lg'>
          {code}
        </div>
      </div>
    </div>
  )
}
