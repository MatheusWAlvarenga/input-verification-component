// vendors
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react'

interface VerificationCodeInputProps {
  length: number
  onChange: (item: string) => void
}

export default function VerificationCodeInput({
  length,
  onChange,
}: VerificationCodeInputProps) {
  const [codes, setCodes] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(length).fill(null),
  )

  useEffect(() => {
    onChange(codes.join(''))
  }, [codes])

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0) {
      const newCodes = [...codes]
      newCodes[index] = ''
      setCodes(newCodes)
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus()
      }, 100)
    } else if (e.key === 'Backspace' && index === 0) {
      const newCodes = [...codes]
      newCodes[index] = ''
      setCodes(newCodes)
    }
  }

  const handleChange = (index: number, value: string) => {
    if (index < length) {
      let newCodes = [...codes]

      if (value.length > 1) {
        newCodes = value.substring(0, 6).split('')

        // If the newCodes array has less than 'length' elements, complete it with empty strings
        while (newCodes.length < length) {
          newCodes.push('')
        }

        setCodes(newCodes)
      } else {
        newCodes[index] = value
        setCodes(newCodes)
      }

      let emptyStringIndex = newCodes.indexOf('')

      if (emptyStringIndex > -1) {
        inputRefs.current[emptyStringIndex]?.focus()
        return
      }

      if (value === '' && index > 0 && index < length - 1) {
        inputRefs.current[index - 1]?.focus()
      } else if (value !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className='flex flex-col gap-6 justify-center items-end'>
      <div className='flex space-x-2'>
        {codes.map((code, index) => (
          <input
            key={index}
            type='text'
            maxLength={length}
            value={code}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            className='w-10 h-10 text-center border border-gray-300 dark:border-gray-400 dark:bg-gray-200 dark:text-gray-700 rounded focus:outline-none focus:border-blue-500'
            ref={(input) => (inputRefs.current[index] = input)}
          />
        ))}
      </div>
    </div>
  )
}
