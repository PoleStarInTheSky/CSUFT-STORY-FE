import React from 'react'
//图片组件
export default function HeaderImg({
  url,
  name,
}: {
  url: string
  name: string
}) {
  return (
    <>
      <img
        className="w-screen object-cover h-60 md:h-72  lg:h-96 animate-appear-defalut"
        src={url}
        alt={name}
      />
      <div className="absolute bottom-0 right-8 md:right-12 bg-black text-white text-base lg:text-lg py-1 px-3  duration-300 opacity-0 group-hover:opacity-75">
        {name}
      </div>
    </>
  )
}
