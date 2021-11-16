import React from 'react'
import Nav from './nav'
import Dropdown from './dropdown'
export default function Navbar() {
  return (
    <>
      {/**注意 Dropdown 在md以下会自动隐藏, Nav 在md以上会自动显示 */}
      <Dropdown />
      <Nav />
    </>
  )
}
