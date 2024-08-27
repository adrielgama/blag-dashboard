import React from 'react'

export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
      </div>
    </div>
  )
}
