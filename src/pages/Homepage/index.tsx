import React from 'react'
import Head from '../../components/Head'
import Sideweather from '../../components/Sideweather'
import Post from '../../components/Post'
import Posts from '../../components/Posts'
export default function Homepage() {
  return (
    <div>
      <Head />
      <div className="flex items-start justify-center">
        <Posts />
        <Sideweather />
      </div>
    </div>
  )
}
