import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import HeaderSkelton from './header-skelton'
import HeaderImg from './header-img'
import useAsync from '../../utils/hooks/useAsync'
//从服务器请求回的图片信息
interface PicInfo {
  name: string
  url: string
}
//读取中的状态
type Status = 'idle' | 'pending' | 'success' | 'error'
export default function Head() {
  const picApi = `${import.meta.env.VITE_SERVER_URI}/resource/headerimg/random`
  // const [status, setStatus] = useState<Status>('pending')
  // const [value, setValue] = useState<PicInfo | null>(null)
  const queryFunc = useCallback(() => {
    //先拿取向服务器请求获得数据，通过promise缓存图片
    function fetchHeaderImg(url: string) {
      return new Promise<PicInfo>((resolve, reject) => {
        axios.get<PicInfo>(url).then((res) => {
          const i = new Image()
          i.onload = () => resolve(res.data)
          i.onerror = reject
          i.src = res.data.url
        })
      })
    }
    return fetchHeaderImg(picApi)
  }, [picApi])

  const { status, value } = useAsync(queryFunc)
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
