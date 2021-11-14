import React from 'react'
export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-y-2 ">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary-default"></div>
        <div className="text-primary-default">加载中...</div>
      </div>
    </div>
  )
}
