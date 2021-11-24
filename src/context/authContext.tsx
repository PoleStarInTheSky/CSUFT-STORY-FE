import axios from 'axios'
import React, { useState, createContext, useEffect } from 'react'
import { ReactNode } from 'react'

//登录和注册时使用的接口
export interface AuthForm {
  account: string
  password: string
}
//服务端中返回的用户信息
export interface UserResponse {
  _id: string
  account: string
  gender: string
  avatarUrl: string //头像Url
  desc: string //个人描述
  token: string
  bannerUrl: string //头图
}
//Context中的用户信息
//去除了 token 属性 然后把所有属性设为可选的
export interface User extends Partial<Omit<UserResponse, 'token'>> {
  //login 表示 User 登录了，有以上信息
  //logout 表示 localStorage 中没有token ， 已经完全退出登录
  //pending 表示User的status正在发生变化
  //uknow 是User初始时的状态，作为占位符，方便子组件条件渲染
  status: 'login' | 'logout' | 'pending' | 'unknow'
}
//一开始设定context为undefined
const AuthContext = createContext<
  | {
      user: User
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => void
    }
  | undefined
>(undefined)
//设定组件在 React Devtool 中的名字
AuthContext.displayName = 'AuthContext'
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ status: 'unknow' })
  const jwtTokenname = '__auth_provider_token__'
  //登录
  //仅仅做发送请求、更新 context ， 更新 localStorage ，没有页面跳转
  const login = (form: AuthForm) => {
    return new Promise<void>((resolve, reject) => {
      const loginApi = `${import.meta.env.VITE_SERVER_URI}/user/login`
      const headers = { 'Content-Type': 'application/json' }
      axios
        .post<UserResponse>(loginApi, JSON.stringify(form), { headers })
        .then((res) => {
          //得到结果，把token存在本地
          localStorage.setItem(jwtTokenname, res.data.token)
          const { _id, account, gender, avatarUrl, desc } = res.data
          setUser({ _id, account, gender, avatarUrl, desc, status: 'login' })
          resolve()
        })
        .catch((error) => {
          //status code在 2xx 字段之外
          if (error.response) {
            console.log(error.response)
          }
          reject(error)
        })
    })
  }
  //登出
  const logout = () => {
    //去除本地token
    //注意，所有的localStorage api都是同步的
    localStorage.removeItem(jwtTokenname)
    setUser({ status: 'logout' })
  }
  //注册
  //TODO 加入昵称，性别，头像等注册可选内容
  const register = (form: AuthForm) => {
    return new Promise<void>((resolve, reject) => {
      const registerApi = `${import.meta.env.VITE_SERVER_URI}/user/register`
      const headers = { 'Content-Type': 'application/json' }
      axios
        .post<UserResponse>(registerApi, JSON.stringify(form), { headers })
        .then((res) => {
          //得到结果，把token存在本地
          localStorage.setItem(jwtTokenname, res.data.token)
          const { _id, account, gender, avatarUrl, desc } = res.data
          setUser({ _id, account, gender, avatarUrl, desc, status: 'login' })
          resolve()
        })
        .catch((error) => {
          //status code在 2xx 字段之外
          if (error.response) {
            console.log(error.response)
          }
          reject(error)
        })
    })
  }
  //每次刷新，若本地有 token 就去向服务端请求相关数据
  useEffect(() => {
    const jwtTokenname = '__auth_provider_token__'
    const token = localStorage.getItem(jwtTokenname)
    if (token) {
      const meApi = `${import.meta.env.VITE_SERVER_URI}/user/me`
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      axios
        .get<UserResponse>(meApi, { headers })
        .then((res) => {
          const { _id, account, gender, avatarUrl, desc } = res.data
          setUser({ _id, account, gender, avatarUrl, desc, status: 'login' })
        })
        .catch((error) => {
          //status code在 2xx 字段之外
          if (error.response) {
            //token 失效，直接清除
            localStorage.removeItem(jwtTokenname)
            setUser({ status: 'logout' })
            console.log(error.response)
          }
        })
    } else {
      //没有 token 直接把状态设置成 logout
      setUser({ status: 'logout' })
    }
  }, [])
  return (
    <AuthContext.Provider
      children={children}
      value={{
        user,
        login,
        register,
        logout,
      }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
