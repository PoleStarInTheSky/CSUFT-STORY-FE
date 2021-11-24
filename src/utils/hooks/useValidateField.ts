import { useEffect, useState } from 'react'
//本 hook 用来验证一个表单字段，如 input 是否通过
//ValidateStatus 表示可能的状态，比如 idle pass error
type ValidateStatus = 'idle' | 'pass' | 'error'
//设置策略函数通过时的返回类型
interface PassReturn {
  state: true
}
//设置策略函数未通过时的返回类型
interface ErrorReturn {
  state: false
  errorMsg: string
}
//策略函数总的返回类型
type StrategyReturn = PassReturn | ErrorReturn
//策略函数的类型
export type Strategy = (field: string) => StrategyReturn
//field 表示该输入框目前的值
//传入 闭包函数 或者 callBack 包裹的形式，避免重复执行
export default function useValidateField(field: string, strategy: Strategy) {
  //idle表示没有输入的状态 即字段为空 设置这个状态可以更细颗粒度地操作渲染等
  const [status, setStatus] = useState<ValidateStatus>('idle')
  //error表示错误信息，只设置 error 信息，因为成功了往往不需要提示
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    if (field === '') {
      setStatus('idle')
    } else {
      console.log('validate执行')
      const result = strategy(field)
      if (result.state === false) {
        setErrorMsg(result.errorMsg)
        setStatus('error')
      } else {
        setStatus('pass')
      }
    }
  }, [field, strategy])
  return { status, errorMsg }
}
