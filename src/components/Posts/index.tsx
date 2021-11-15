import React from 'react'
import Post from '../Post'
export default function Posts() {
  return (
    <>
      <div className="flex flex-wrap m-5 flex-3 justify-center items-start  gap-x-7">
        {Array.from(Array(8), () => (
          <Post />
        ))}
      </div>
    </>
  )
}
