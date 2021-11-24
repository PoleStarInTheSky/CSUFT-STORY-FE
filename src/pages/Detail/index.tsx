import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css'
import ReactMarkdown from 'react-markdown'
const mdParser = new MarkdownIt()

export default function Detail() {
  const file = `## A demo of 
  aaaaaa
  a
  a
  a
  a
  a
  a
  aa
  a
  a
  a
  aa
  a
  
  a
  a
  aa
  
  aa
  
  aa
  a
  a
  a
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur.
![Garden of Words picture.png](http://81.70.81.69/images/6a1049c70d751067ec7e42f59a73d58d4.png)`
  return (
    <div>
      <div className="w-screen flex items-center justify-center mt-3 flex-col">
        <img
          className="w-screen sm:w-7/10screen h-56 object-cover animate-appear-defalut rounded-md"
          src="https://image.gcores.com/7f9ba4bf-9e7b-46ad-ac2a-d9ddec706a42.png?x-oss-process=image/resize,limit_1,m_lfit,w_1000/quality,q_90"
          alt="头图"
        />
        <div className="text-3xl  md:text-4xl font-bold text-center mt-2">
          虚空与无限之轮回的无依之地
        </div>
        <div className="mt-2 flex items-center w-screen sm:w-7/10screen justify-between flex-col sm:flex-row sm:gap-y-5">
          <div className="text-base sm:text-lg text-primary-default font-semibold">
            2020-12-30
          </div>
          <div className="text-base sm:text-lg text-primary-default font-semibold">
            这个id名字超级长
          </div>
        </div>
        <article className="prose-sm sm:prose lg:prose-lg">
          <ReactMarkdown>{file}</ReactMarkdown>
        </article>
        <div className="w-screen sm:w-7/10screen flex flex-wrap items-center justify-start text-base sm:text-lg text-primary-default font-semibold">
          <span>#哈哈</span>
        </div>
      </div>
    </div>
  )
}
