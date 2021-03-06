import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../../utils/hooks/useDocumentTitle'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import useAsync from '../../utils/hooks/useAsync'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useValidateField, { Strategy } from '../../utils/hooks/useValidateField'
export default function Login() {
  //页面跳转的函数
  const navigate = useNavigate()
  //设定页面的标题
  useDocumentTitle('登录')
  //输入框的账号和密码
  const [account, setaccount] = useState('')
  const [password, setPassword] = useState('')
  //实用useAync管理状态
  //使用excute函数就会执行登录逻辑
  const { login } = useAuth()
  //包含参数的登录函数 作为useAync 的 excute
  const loginWithParam = useCallback(() => {
    return login({ account, password })
  }, [account, password, login])
  const { execute, status } = useAsync(loginWithParam, false)
  //submit 事件的处理函数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    execute()
  }
  //当登录成功后，跳转到首页
  useEffect(() => {
    if (status === 'success') {
      navigate('/')
    }
  }, [status, navigate])
  //对account字段的验证策略
  const accountFn: Strategy = useCallback((field) => {
    if (field.length < 4) {
      return { state: false, errorMsg: '账号长度太短' }
    } else if (field.length > 20) {
      return { state: false, errorMsg: '账号长度太长' }
    } else {
      return { state: true }
    }
  }, [])
  //对 account 字段是否通过进行监听
  const { status: accountStatus, errorMsg: accountErrorMsg } = useValidateField(
    account,
    accountFn,
  )
  //对password字段的验证策略
  const passwordFn: Strategy = useCallback((field) => {
    if (field.length < 8) {
      return { state: false, errorMsg: '密码长度太短' }
    } else if (field.length > 20) {
      return { state: false, errorMsg: '密码长度太长' }
    } else {
      return { state: true }
    }
  }, [])
  //对 password 字段是否通过进行监听
  const { status: passwordStatus, errorMsg: passwordErrorMsg } =
    useValidateField(password, passwordFn)
  return (
    <div className="flex-1 animate-appear-defalut">
      <div className="bg-login bg-cover bg-no-repeat w-full h-full flex items-center justify-center">
        <div className="w-80 h-96 sm:w-96  bg-white rounded-3xl shadow-lg">
          <p className="text-center pt-8 text-primary-default font-bold text-xl select-none">
            欢迎回到林大故事
          </p>
          <form
            className="pt-8 flex flex-col items-center justify-center gap-y-8"
            onSubmit={handleSubmit}
          >
            <div className="w-3/4">
              <input
                className={`text-center w-full bg-gray-50 font-bold px-1 py-2 rounded-3xl border-2 outline-none duration-300 ${
                  accountStatus === 'error' &&
                  'border-red-400 focus:border-red-600'
                } ${
                  accountStatus === 'pass' &&
                  'border-primary-shallow focus:border-primary-default'
                } ${
                  accountStatus === 'idle' &&
                  'border-gray-100 focus:border-gray-300'
                }`}
                type="text"
                placeholder="账号"
                onChange={(e) => setaccount(e.target.value)}
                disabled={status === 'pending'}
              />
              {accountStatus === 'error' && (
                <div className="text-sm ml-4 text-red-600 font-semibold">
                  {accountErrorMsg}
                </div>
              )}
            </div>
            <div className="w-3/4">
              <input
                className={`text-center w-full bg-gray-50 font-bold px-1 py-2 rounded-3xl border-2 outline-none duration-300 ${
                  passwordStatus === 'error' &&
                  'border-red-400 focus:border-red-600'
                } ${
                  passwordStatus === 'pass' &&
                  'border-primary-shallow focus:border-primary-default'
                } ${
                  passwordStatus === 'idle' &&
                  'border-gray-100 focus:border-gray-300'
                }`}
                type="password"
                placeholder="密码"
                onChange={(e) => setPassword(e.target.value)}
                disabled={status === 'pending'}
              />
              {passwordStatus === 'error' && (
                <div className="text-sm ml-4 text-red-600 font-semibold">
                  {passwordErrorMsg}
                </div>
              )}
            </div>
            <div className="w-1/4">
              {status == 'error' && (
                <div className="text-sm  text-red-600 font-semibold w-full text-center mb-1">
                  出错,请重试
                </div>
              )}
              {status === 'pending' ? (
                <div className="flex justify-center items-center flex-col gap-y-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2  border-primary-default"></div>
                  <div className="text-primary-default text-sm">加载中...</div>
                </div>
              ) : (
                <button
                  disabled={
                    accountStatus !== 'pass' || passwordStatus !== 'pass'
                  }
                  type="submit"
                  className="disabled:opacity-50 disabled:cursor-default cursor-pointer inline-block text-center text-white tracking-wider font-bold w-full px-1 py-2 rounded-2xl bg-gradient-to-r from-primary-deep to-primary-shallower"
                >
                  登录
                </button>
              )}
            </div>
          </form>
          {status !== 'pending' && (
            <div className="text-sm mt-4 flex justify-center items-center w-full tracking-wider text-primary-shallow hover:text-primary-deep select-none cursor-pointer">
              <Link to="/register"> 还没有注册？</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
