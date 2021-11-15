import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

//图片加载时的骨架
function HeaderSkelton() {
  return (
    <div className="animate-pulse bg-gray-300  w-full h-60 md:h-72 lg:h-96"></div>
  )
}
//图片组件
function HeaderImg({ url, name }: { url: string; name: string }) {
  return (
    <>
      <img
        className="w-full object-cover h-60 md:h-72  lg:h-96 animate-appear-defalut"
        src={url}
        alt={name}
      />
      <div className="absolute bottom-0 right-8 md:right-12 bg-black text-white text-base lg:text-lg py-1 px-3  duration-300 opacity-0 group-hover:opacity-75">
        {name}
      </div>
    </>
  )
}
//从服务器请求回的图片信息
interface PicInfo {
  name: string
  url: string
}
//读取中的状态
type Status = 'idle' | 'pending' | 'success' | 'error'
export default function Head() {
  const picApi = `${import.meta.env.VITE_SERVER_URI}/resource/headerimg/random`
  const [status, setStatus] = useState<Status>('pending')
  const [value, setValue] = useState<PicInfo | null>(null)
  useEffect(() => {
    //先拿取向服务器请求获得数据，再在
    function fetchHeaderImg(url: string) {
      return new Promise((resolve, reject) => {
        axios.get<PicInfo>(url).then((res) => {
          const i = new Image()
          i.onload = () => resolve(res.data)
          i.onerror = reject
          i.src = res.data.url
        })
      })
    }
    fetchHeaderImg(picApi).then((res) => {
      setStatus('success')
      setValue(res as PicInfo)
    })
  }, [picApi])
  return (
    <div>
      <div className="w-full relative mt-4 group duration-300">
        {status === 'pending' && <HeaderSkelton />}
        {status === 'success' && (
          <HeaderImg url={value?.url as string} name={value?.name as string} />
        )}
      </div>
    </div>
  )
}
