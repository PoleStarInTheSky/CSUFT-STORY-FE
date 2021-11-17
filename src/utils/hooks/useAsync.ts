import { useState, useCallback, useEffect } from 'react'
type Status = 'idle' | 'pending' | 'success' | 'error'
export default function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) {
  const [status, setStatus] = useState<Status>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)
  console.log('in')
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

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])
  return { execute, status, value, error }
}
