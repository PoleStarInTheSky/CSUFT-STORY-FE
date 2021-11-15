import React from 'react'
import Loading from '../Loading'
export default function Sideweather() {
  const data = {
    code: '200',
    updateTime: '2021-11-15T14:07+08:00',
    fxLink: 'http://hfx.link/1tyf1',
    now: {
      obsTime: '2021-11-15T13:48+08:00',
      temp: '20',
      feelsLike: '18',
      icon: '101',
      text: '多云',
      wind360: '180',
      windDir: '南风',
      windScale: '2',
      windSpeed: '11',
      humidity: '40',
      precip: '0.0',
      pressure: '1016',
      vis: '24',
      cloud: '91',
      dew: '9',
    },
    refer: {
      sources: ['QWeather', 'NMC', 'ECMWF'],
      license: ['no commercial use'],
    },
  }
  return (
    <>
      <div className="flex-1 m-5 pb-7  duration-300 rounded-xl flex flex-col items-center">
        <div className="flex flex-col items-center ">
          <span className="mt-2 pb-1 w-5/6 border-t border-b text-center text-sm font-semibold border-primary-default tracking-widest">
            关于
          </span>
          <img
            className="mt-4 w-64 h-64 object-cover"
            src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
            alt="头像"
          />
          <p className="p-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            qui necessitatibus nostrum illum reprehenderit.
          </p>
        </div>
        <div className="flex flex-col items-center w-64">
          <span className="mt-2 pb-1 w-5/6 border-t border-b text-center text-sm font-semibold border-primary-default tracking-widest">
            故事分类
          </span>
          {/* <ul className="sidebarList">
              {cats.map((c) => (
                <Link to={`/?cat=${c.name}`} className="link">
                  <li className="sidebarListItem">{c.name}</li>
                </Link>
              ))}
            </ul> */}
        </div>
        <div className="flex flex-col items-center w-64">
          <span className="mt-2 pb-1 w-5/6 border-t border-b text-center text-sm font-semibold border-primary-default tracking-widest">
            联系我
          </span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    </>
  )
}
