import React from 'react'

export default function Login() {
  return (
    <div className="flex-1">
      <div className="bg-login bg-cover bg-no-repeat w-full h-full mt-2 flex items-center justify-center">
        <div className="w-80 h-80 sm:w-96 sm:h-96 bg-white rounded-3xl shadow-lg">
          <p className="text-center pt-8 text-primary-default font-bold text-xl">
            欢迎回到林大故事
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
              <a className="cursor-pointer inline-block text-center text-white tracking-wider font-bold w-full px-1 py-2 rounded-2xl bg-gradient-to-r from-primary-deep to-primary-shallower">
                登录
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
