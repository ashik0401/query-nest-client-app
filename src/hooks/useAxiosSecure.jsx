import { useEffect } from 'react'
import axios from 'axios'
import useAuth from './useAuth'

const axiosSecure = axios.create({
  baseURL: 'https://query-nest-server-side.vercel.app'
})

const useAxiosSecure = () => {
  const { user, logOut } = useAuth()

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(async config => {
      if (user) {
        const token = await user.getIdToken()
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    })

    const responseInterceptor = axiosSecure.interceptors.response.use(
      res => res,
      err => {
        const status = err.response?.status
        if (status === 401 || status === 403) {
          logOut()
        }
        return Promise.reject(err)
      }
    )

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor)
      axiosSecure.interceptors.response.eject(responseInterceptor)
    }
  }, [user, logOut])

  return axiosSecure
}

export default useAxiosSecure;
