import { ReactNode } from "react"

type ErrorMesageProps = {
    children: ReactNode
}
export default function ErrorMesage({children} : ErrorMesageProps) {
  return (
    <p className='bg-red-300 border-l-4 border-red-700 p-3 text-red-800 font-bold text-sm text-center'>
        {children}
    </p>
  )
}
