import React from 'react'

export default function Navbar() {
  return (
    <div>
      <div className="w-full bg-white sticky z-100 top-0 h-10 hidden md:flex items-center justify-center font-light md:text-base lg:text-lg ">
        <div className="flex-1">
          <div className="flex items-center justify-start md:pl-10 lg:pl-16 ">
            <span className="inline-block p-1.5 font-normal bg-gray-500 text-white hover:bg-gray-700 duration-300">
              林大故事
            </span>
          </div>
        </div>

        <div className="flex-1">
          <ul className="flex items-center justify-center md:gap-x-6 lg:gap-x-10 ">
            <li className="cursor-pointer">主页</li>
            <li className="cursor-pointer">关于</li>
            <li className="cursor-pointer">联系</li>
            <li className="cursor-pointer">创作</li>
            <li className="cursor-pointer">登出</li>
          </ul>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-end md:gap-x-6 lg:gap-x-10 md:pr-10 lg:pr-16 ">
            <img
              className="object-cover h-10 w-10 rounded-full cursor-pointer"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            {/* <div>图片</div>
            <div>登录</div>
            <div>搜索</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
