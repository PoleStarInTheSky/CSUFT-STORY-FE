import React from 'react'
import { Link } from 'react-router-dom'
export default function Post() {
  return (
    <div>
      <div className="w-96 flex flex-col mx-6 mt-10">
        <img
          className="w-96 h-72 object-cover rounded-lg"
          src="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        />
        <div className="flex flex-col items-center">
          <div className="">
            {/*下面是一个个分类小组件 */}
            <span className="text-sm text-primary-default mt-4 mr-2 cursor-pointer">
              <Link className="link" to="/posts?cat=Music">
                Music
              </Link>
            </span>
            <span className="text-sm text-primary-default  mt-4 mr-2 cursor-pointer">
              <Link className="link" to="/posts?cat=Music">
                Life
              </Link>
            </span>
          </div>
          <span className="text-2xl font-black mt-4 cursor-pointer text-center">
            <Link to="/post/abc" className="link">
              Lorem ipsum dolor sit amet
            </Link>
          </span>
          <hr />
          <span className="text-sm text-gray-400 mt-4 italic text-center">
            1 hour ago
          </span>
        </div>
        {/*暂时使用@tailwindcss/line-clamp实现按行数截断，之后采用兼容性更好的方法 */}
        <p className="text-sm text-gray-500 mt-4 line-clamp-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
          fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
          atque, exercitationem quibusdam, reiciendis odio laboriosam?
        </p>
      </div>
    </div>
  )
}
