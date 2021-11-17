import React, { useState } from 'react'
import useToggle from '../../utils/hooks/useToggle'
import { Link } from 'react-router-dom'
export default function Dropdown() {
  const [show, toggleShow] = useToggle(false)
  return (
    <>
      <div className="flex items-center justify-between md:hidden h-10 sticky z-100 top-0 bg-white">
        <div className="text-lg p-1.5 font-normal bg-gray-500 text-white hover:bg-primary-default duration-300 cursor-default">
          林大故事
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 fill-current text-black cursor-pointer duration-300 mr-4 hover:text-primary-default"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={toggleShow}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      <ul
        className={`${
          show ? 'opacity-1' : 'opacity-0'
        } flex items-center justify-center flex-col md:hidden fixed w-full z-100 top-10 bg-white bg-opacity-90 text-gray-800 gap-y-4 py-1 duration-300`}
      >
        <li className="hover:text-primary-default cursor-pointer">
          <Link to="/">主页</Link>
        </li>
        <li className="hover:text-primary-default cursor-pointer">
          <Link to="/write">创作</Link>
        </li>
        <li className="hover:text-primary-default cursor-pointer">偶遇</li>
        <li className="hover:text-primary-default cursor-pointer">设置</li>
        <li className="hover:text-primary-default cursor-pointer">我的</li>
        <li className="hover:text-primary-default cursor-pointer">登出</li>
      </ul>
    </>
  )
}
