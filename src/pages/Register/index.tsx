import React from 'react'
import useDocumentTitle from '../../utils/hooks/useDocumentTitle'
export default function Register() {
  useDocumentTitle('注册')
  return (
    <div className="flex-1 animate-appear-defalut">
      <div className="bg-register bg-cover bg-no-repeat w-full h-full flex items-center justify-center">
        <div className="w-80 h-96 sm:w-96  bg-white rounded-3xl shadow-lg">
          <p className="text-center pt-8 text-primary-default font-bold text-xl select-none">
            欢迎加入林大故事
          </p>
          <form className="pt-8 flex flex-col items-center justify-center gap-y-8">
            <div className="w-3/4">
              <input
                className="text-center w-full bg-gray-50 font-bold px-1 py-2 rounded-3xl border-gray-100 focus:border-gray-300 border-2 outline-none"
                type="text"
                placeholder="账号"
              />
            </div>
            <div className="w-3/4">
              <input
                className="text-center w-full bg-gray-50 font-bold px-1 py-2 rounded-3xl border-gray-100 focus:border-gray-300 border-2 outline-none"
                type="password"
                placeholder="密码"
              />
            </div>
            <div className="w-1/4">
              <button className="disabled:opacity-50 disabled:cursor-default cursor-pointer inline-block text-center text-white tracking-wider font-bold w-full px-1 py-2 rounded-2xl bg-gradient-to-r from-primary-deep to-primary-shallower">
                注册
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
