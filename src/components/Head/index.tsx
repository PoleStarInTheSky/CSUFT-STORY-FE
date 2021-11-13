import React from 'react'

export default function Head() {
  return (
    <div>
      <div className="w-full relative mt-6 group">
        <img
          className="w-full object-cover h-60 md:h-72  lg:h-96 mt-8"
          src="https://www.csuft.edu.cn/nylbt/202106/W020210618682298826239.png"
          alt="封面"
        />

        <div className="absolute bottom-0 right-8 md:right-12 bg-black text-white text-base lg:text-lg py-1 px-3  duration-300 opacity-0 group-hover:opacity-75">
          东园-樱花路
        </div>
      </div>
    </div>
  )
}
