import originAxios from 'axios'

const Service = originAxios.create({
  baseURL: '/api',
  timeout: 5000
})

Service.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

Service.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export default Service

