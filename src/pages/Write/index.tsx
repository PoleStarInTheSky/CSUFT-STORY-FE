import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from '../../utils/deBounce'
import useDocumentTitle from '../../utils/hooks/useDocumentTitle'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useAuth } from '../../context/authContext'
import DropUpload from '../../components/DropUpload'
import useAsync from '../../utils/hooks/useAsync'

// 故事的两种类型， 分为草稿和正式
// 草稿类型
interface Draft {
  readonly title?: string
  readonly desc?: string
  readonly header_img?: string
  readonly likes?: number
  readonly body?: string
  readonly type: 'draft'
  readonly author: string
  readonly date_posted?: string
  // 数据何时被更新需要保存下来，方便给用户显示
  readonly date_updated: string
}
// 正式类型
interface Formal {
  readonly title: string
  readonly desc: string
  readonly header_img: string
  readonly likes: number
  readonly body: string
  readonly type: 'formal'
  readonly author: string
  readonly date_posted: string
  readonly date_updated: string
}
// 使用联合类型定义文章类型
export type Post = Draft | Formal
//定义post接口的返回数据
type PostResponse = { _id: string } & Post

//获取 浏览器的 history
//因为 React-router 就是用的是 history 包，所以这里实用包，不直接用全局对象
const history = createBrowserHistory()

// 初始化 markdown 解析器
const mdParser = new MarkdownIt()
//lock 用来追踪当前 input 框是否属于 onComposition 状态
//处于 onComposition 状态的时候，组件被输入法在输入
//项目并不希望监听这一阶段的内容，所以在这一阶段不调用onChange回调函数
//注意几个事件的触发顺序
//谷歌浏览器： compositionstart -> onChange -> compositionend
//其他浏览器： compositionstart -> compositionend -> onChange
let lock = false
export default function Write() {
  console.log('####rerender')
  //当前故事的 id ,如果是新建的文章，那么id是undefined
  //注意useParams 获得的数据只与 Link 标签的 to 有关系，后来有更改不会有大的影响
  const { postid: postidUrl } = useParams()
  const [postid, setPostid] = useState<undefined | string>(postidUrl)
  console.log(postid)
  //头图链接
  const [headerImg, setHeaderImg] = useState('')
  //标题
  const [title, setTitle] = useState('')
  //摘要
  const [desc, setDesc] = useState('')
  //文章正文
  const [body, setBody] = useState('')
  const { user } = useAuth()
  //设置页面的标题
  useDocumentTitle(title || '创作')
  // 实现故事实时创建和保存
  useEffect(() => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    const postApi = `${import.meta.env.VITE_SERVER_URI}/post`
    if (postid) {
      //如果是在编辑一篇文章
    } else {
      //如果是在编写一篇新的文章
      // 至少输入了一些信息才创建文章
      if (body || title || desc || headerImg) {
        const post: Post = {
          body,
          title,
          desc,
          header_img: headerImg,
          author: user._id as string,
          date_updated: new Date().toISOString(),
          type: 'draft',
        }
        //创建文章
        axios
          .post<PostResponse>(postApi, post, config)
          .then((res) => {
            //使用replace而不是 useNavigate , 实时更改, 不污染 history 记录
            history.replace(`/${res.data._id}`)
            // 成功创建文章后设置当前文章的id
            setPostid(res.data._id)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }, [postid, title, desc, headerImg, body, user])
  //当文章标题发生变化时调用
  const handleOnchange = (e) => {
    if (!lock) {
      if (e.target.value !== '') {
        setTitle(`${e.target.value} - 创作`)
      } else {
        setTitle('创作')
      }
    }
  }
  //提交文章表单时调用
  const handleSubmit = () => {
    console.log('yes')
  }
  //文章中上传图片时调用
  const handleUploadImg: (file: File) => Promise<string> = (file) => {
    return new Promise<string>((resolve, reject) => {
      //构建表单数据结构
      const fd = new FormData()
      //将图片放入
      fd.append('image', file)
      //发送请求
      axios
        .post<{ url: string }>(
          `${import.meta.env.VITE_SERVER_URI}/upload/image`,
          fd,
        )
        .then((res) => {
          resolve(res.data.url)
        })
        .catch(reject)
    })
  }
  //头图上传成功时调用
  const handleHeaderSuccess = useCallback((url: string) => {
    setHeaderImg(url)
  }, [])
  const [show, setShow] = useState(false)
  const [tags, setTags] = useState('')
  return (
    <>
      <div className="pt-2 w-screen flex-1">
        <form
          className="w-full flex items-center flex-col justify-center h-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center flex-col justify-center">
            {/*头图组件*/}
            <DropUpload
              className="mb-2 w-7/10screen h-40"
              onSuccess={handleHeaderSuccess}
            />
            {/*标题*/}
            <input
              type="text"
              placeholder="请输入标题"
              className="border-none w-3/4 placeholder-gray-500 outline-none text-2xl font-bold"
              autoFocus={false}
              onChange={handleOnchange}
              onCompositionStart={debounce(() => {
                lock = true
              })}
              onCompositionEnd={debounce((e) => {
                lock = false
                handleOnchange(e)
              })}
            />
            {/*标签*/}
            <div className="w-3/4 relative h-7 mt-3">
              <input
                placeholder="请输入标签"
                className={`${
                  show || !tags ? 'opacity-100' : 'opacity-0'
                } absolute resize-none border-none w-full placeholder-gray-500  font-semibold  outline-none text-lg`}
                autoFocus={false}
                onChange={(e) => {
                  setTags(e.target.value)
                }}
                onFocus={() => setShow(true)}
                onBlur={(e) => {
                  setShow(false)
                  //去除多余空格
                  e.target.value = tags.replace(/\s+/g, ' ')
                  setTags(e.target.value)
                }}
                onCompositionStart={debounce(() => {
                  lock = true
                })}
                onCompositionEnd={debounce((e) => {
                  lock = false
                  handleOnchange(e)
                })}
              />
              {/**pointer-events-none 取消了自身的所有点击事件 */}
              <div
                className={`${
                  !show && tags !== '' ? 'opacity-100' : 'opacity-0'
                }  text-lg font-semibold absolute pointer-events-none`}
              >
                {tags
                  .match(/(^|\s)(#[\u4e00-\u9fa5a-z\d-]+)/gi)
                  ?.map((item) => (
                    <span className="text-primary-default">{item}</span>
                  ))}
              </div>
            </div>

            {/*摘要*/}
            <textarea
              placeholder="请输入摘要"
              className="writeInput resize-none border-none w-3/4 placeholder-gray-500 font-semibold mt-3 outline-none text-lg mb-3"
              rows={3}
              autoFocus={false}
              onChange={handleOnchange}
              onCompositionStart={debounce(() => {
                lock = true
              })}
              onCompositionEnd={debounce((e) => {
                lock = false
                handleOnchange(e)
              })}
            />
          </div>
          <div className="w-full flex-1">
            <MdEditor
              style={{ height: '100%', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={(e) => setBody(e.text)}
              placeholder={`书写你的林大故事...\n\n提示:可以点击工具栏最右侧切换全屏编辑`}
              onImageUpload={handleUploadImg}
            />
          </div>

          <div className="flex flex-col md:flex-row w-full mt-1 items-center justify-center md:justify-around">
            <div className="mb:2 md:mb-0 text-gray-400">已保存</div>
            <button
              type="submit"
              className="disabled:opacity-50 disabled:cursor-default cursor-pointer inline-block text-center text-white tracking-wider font-bold w-full md:w-1/6 px-1 py-2 rounded-2xl bg-gradient-to-r from-primary-deep to-primary-shallower"
            >
              发布
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
