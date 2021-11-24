import React from 'react'
import { Link } from 'react-router-dom'
export default function Nav() {
  return (
    <div className="w-screen py-6 sticky z-100 top-0 h-10 hidden md:flex items-center justify-center font-light text-lg bg-white">
      <div className="flex-1">
        <div className="flex items-center justify-start md:pl-10 lg:pl-16 ">
          <span className="select-none inline-block p-1.5 font-normal bg-gray-500 text-white hover:bg-primary-default duration-300 cursor-default">
            林大故事
          </span>
        </div>
      </div>

      <div className="flex-2">
        <ul className="flex items-center justify-center md:gap-x-6 lg:gap-x-10 ">
          <li className="cursor-pointer hover:text-primary-default duration-300 select-none">
            <Link to="/">主页</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-default duration-300 select-none">
            <Link to="/write">创作</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-default duration-300 select-none">
            偶遇
          </li>
          <li className="cursor-pointer hover:text-primary-default duration-300 select-none">
            <Link to="/settings">设置</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-default duration-300 select-none">
            登出
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-end md:gap-x-6 lg:gap-x-10 md:pr-10 lg:pr-16 ">
          <img
            className="object-cover h-10 w-10 rounded-full cursor-pointer "
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
