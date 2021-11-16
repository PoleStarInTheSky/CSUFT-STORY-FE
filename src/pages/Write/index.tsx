import React, { useEffect, useState } from 'react'
import { debounce } from '../../utils/deBounce'
import useDocumentTitle from '../../utils/hooks/useDocumentTitle'

//lock 用来追踪当前 input 框是否属于 onComposition 状态
//处于 onComposition 状态的时候，组件被输入法在输入
//项目并不希望监听这一阶段的内容，所以在这一阶段不调用onChange回调函数
//注意几个事件的触发顺序
//谷歌浏览器： compositionstart -> onChange -> compositionend
//其他浏览器： compositionstart -> compositionend -> onChange
let lock = false
export default function Write() {
  console.log('####rerender')
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('创作')
  const [desc, setDesc] = useState('')
  useDocumentTitle(title)
  const handleOnchange = (e) => {
    if (!lock) {
      if (e.target.value !== '') {
        setTitle(`${e.target.value} - 创作`)
      } else {
        setTitle('创作')
      }
    }
  }
  const handleSubmit = () => {
    console.log('yes')
  }
  return (
    <div className="pt-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      {file && (
        <img
          className="ml-36 w-7/10screen h-64 rounded-xl object-cover"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="relative" onSubmit={handleSubmit}>
        <div className="ml-36 flex items-center">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files != null) setFile(e.target.files[0])
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={debounce(handleOnchange)}
            onCompositionStart={debounce(() => {
              lock = true
            })}
            onCompositionEnd={debounce((e) => {
              lock = false
              handleOnchange(e)
            })}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          发布
        </button>
      </form>
    </div>
  )
}
