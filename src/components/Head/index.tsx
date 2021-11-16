import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HeaderSkelton from './header-skelton'
import HeaderImg from './header-img'
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
    //先拿取向服务器请求获得数据，通过promise缓存图片
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
      <div className="w-full relative mt-0 md:mt-4 group duration-300">
        {status === 'pending' && <HeaderSkelton />}
        {status === 'success' && (
          <HeaderImg url={value?.url as string} name={value?.name as string} />
        )}
      </div>
    </div>
  )
}
