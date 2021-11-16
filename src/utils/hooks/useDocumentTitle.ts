import { useEffect, useRef } from 'react'

//keepOnUnmount表示当前组件卸载后，是否回到原来的标题
export default function useDocumentTitle(title: string, keepOnUnmount = false) {
  //useRef后在整个生命周期中都不会变化

  const oldTitle = useRef(document.title).current
  console.log(oldTitle)
  //组件渲染时，把title设置为自定义的
  useEffect(() => {
    document.title = title
  }, [title])

  //退出时，把标题还原回原来的状态
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}
