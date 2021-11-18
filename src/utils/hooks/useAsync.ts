import { useState, useCallback, useEffect } from 'react'
//一个请求的状态，注意idle旨在参数immediate为false时才有用
type Status = 'idle' | 'pending' | 'success' | 'error'
//本项目使用useAsync管理异步请求
//建议传入一个被useCallback包裹的函数，以免 hook 重复执行
export default function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) {
  const [status, setStatus] = useState<Status>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  //记忆好excute函数，只有asyncFunction变化时才会执行
  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)
    return asyncFunction()
      .then((response: any) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: any) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])

  //如果immediate为true，那么立即执行
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])
  return { execute, status, value, error }
}
