import React, { useState, useCallback, useEffect, useRef } from 'react'
import useAsync from '../../utils/hooks/useAsync'
import axios from 'axios'
//封装的一个用于图片拖拽上传的组件，基于 tailwind
export default function DropUpload({
  className,
  onSuccess,
}: {
  className: string
  onSuccess: (url: string) => void
}) {
  //文章中上传图片时调用
  const handleUploadImg: (file: File) => Promise<string> = (file) => {
    return new Promise<string>((resolve, reject) => {
      //构建表单数据结构
      const fd = new FormData()
      //将图片放入
      fd.append('image', file)
      //发送请求
      axios
        .post<{ url: string }>(
          `${import.meta.env.VITE_SERVER_URI}/upload/image`,
          fd,
        )
        .then((res) => {
          resolve(res.data.url)
        })
        .catch(reject)
    })
  }
  //储存头图文件
  const [headerFile, setHeaderFile] = useState<File | null>(null)
  //处理头图上传的函数,加载完再返回
  const handleHeaderFile = useCallback(() => {
    return new Promise((resolve, reject) => {
      const i = new Image()
      handleUploadImg(headerFile as File).then((res) => {
        i.src = res
        i.onload = () => resolve(res)
        i.onerror = reject
      })
    })
  }, [headerFile])
  //用useAsync来管理上传头图的状态
  const {
    status: headerStatus,
    value: headerValue,
    execute: headerExcute,
  } = useAsync(handleHeaderFile, false)

  //从根源上说 ， 只要头图文件发送变化就执行上传函数
  useEffect(() => {
    if (headerFile) headerExcute()
  }, [headerFile, headerExcute])
  //头图上传成功，更改本地string
  useEffect(() => {
    if (typeof headerValue === 'string') onSuccess(headerValue)
  }, [onSuccess, headerValue])
  //获取头图区域的input按钮
  const $input = useRef<HTMLInputElement>(null)
  return (
    <div
      className={className}
      onClick={() => $input.current?.click()}
      onDrop={(e) => {
        e.preventDefault()
        setHeaderFile(e.dataTransfer.files[0])
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDragLeave={(e) => {
        e.preventDefault()
      }}
    >
      <div
        className={`w-full h-full flex items-center justify-center duration-300 ${
          headerStatus === 'idle'
            ? 'border-dashed border-2 border-gray-300  shadow-md rounded-md'
            : ''
        } `}
      >
        {headerStatus === 'idle' && (
          <div className="text-gray-500">请点击或拖拽上传你的图片</div>
        )}
        {headerStatus === 'pending' && (
          <div className="animate-pulse bg-gray-300 h-full w-full rounded-md"></div>
        )}
        {headerStatus === 'success' && (
          <img
            className="w-full h-full object-cover animate-appear-defalut rounded-md"
            src={headerValue as string}
            alt="头图"
          />
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={$input}
          onChange={(e) => {
            if (e.target.files) setHeaderFile(e.target.files[0])
          }}
        />
      </div>
    </div>
  )
}
