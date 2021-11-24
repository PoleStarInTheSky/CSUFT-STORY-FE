import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useReducer } from 'react'
import DropUpload from '../../components/DropUpload'
import { useAuth } from '../../context/authContext'
import useDocumentTitle from '../../utils/hooks/useDocumentTitle'
import useValidateField from '../../utils/hooks/useValidateField'
import { Strategy } from '../../utils/hooks/useValidateField'
const reducer = (state, action) => {
  switch (action.type) {
    case 'desc':
      return {
        desc: action.value,
        avatarUrl: state.avatarUrl,
        bannerUrl: state.bannerUrl,
      }
    case 'bannerUrl':
      return {
        desc: state.value,
        bannerUrl: action.value,
        avatarUrl: state.avatarUrl,
      }
    case 'avatar':
      return {
        desc: state.value,
        bannerUrl: state.bannerUrl,
        avatarUrl: action.value,
      }
  }
}
//对自我介绍的验证策略
const descStrategy: Strategy = (field) => {
  if (field.length < 10) return { state: false, errorMsg: '自我介绍最少10个字' }
  else if (field.length > 100)
    return { state: false, errorMsg: '自我介绍最多100个字' }
  else return { state: true }
}
export default function Settings() {
  //跳转路由
  const navigate = useNavigate()
  useDocumentTitle('设置')
  //使用 useReducer 管理多个状态
  const { user } = useAuth()
  const [state, dispatch] = useReducer(reducer, {
    desc: user.desc || '',
    bannerUrl: user.bannerUrl || '',
    avatarUrl: user.avatarUrl || '',
  })
  const { status: descStatus, errorMsg: descErrorMsg } = useValidateField(
    state?.desc as string,
    descStrategy,
  )
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (descStatus === 'pass') {
      const updateUserUrl = `${import.meta.env.VITE_SERVER_URI}/${user._id}`
      const data = {
        desc: state?.desc,
        bannerUrl: state?.bannerUrl,
        avatarUrl: state?.avatarUrl,
      }
      const config = { headers: { 'content-type': 'application/json' } }
      axios
        .patch(updateUserUrl, data, config)
        .then((res) => {
          navigate('/')
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <div>
      <div className="w-screen flex items-center justify-center mt-3 flex-col">
        <div className="text-primary-default font-semibold text-2xl sm:text-3xl">
          更改你的信息
        </div>
        <form
          className="flex items-start justify-center flex-col w-5/6 sm:w-3/4"
          onSubmit={handleSubmit}
        >
          <div className="font-semibold text-lg mb-1">个人介绍</div>
          <textarea
            value={state?.desc}
            onChange={(e) => dispatch({ type: 'desc', value: e.target.value })}
            placeholder="请输入摘要"
            className="w-full sm:w-3/4 text-base sm:text-lg border-2 rounded-md shadow-md p-3 resize-none border-none  placeholder-gray-500   outline-none mb-1"
            rows={7}
            autoFocus={false}
          />
          {descStatus == 'error' && (
            <div className=" text-red-600 font-semibold w-full mb-4">
              {descErrorMsg}
            </div>
          )}
          <div className="font-semibold text-lg mb-1">主页头图</div>
          <DropUpload
            className="w-full sm:w-2/3 h-40 mb-3"
            onSuccess={(url) => {
              dispatch({ type: 'bannerUrl', value: url })
            }}
            defaultUrl="https://image.gcores.com/ef02ea55-cb5d-40fb-8968-fb8156b3a4aa.jpg?x-oss-process=image/resize,limit_1,m_lfit,w_2500,h_2500/quality,q_90"
          />
          <div className="font-semibold text-lg mb-1">我的头像</div>
          <DropUpload
            className="w-full sm:w-1/2 h-40 mb-6"
            onSuccess={(url) => {
              dispatch({ type: 'avatarUrl', value: url })
            }}
          />
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="disabled:opacity-50 disabled:cursor-default cursor-pointer inline-block text-center text-white tracking-wider font-bold w-full md:w-1/6 px-1 py-2 rounded-2xl bg-gradient-to-r from-primary-deep to-primary-shallower"
            >
              修改
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
