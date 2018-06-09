import axios from 'axios'
import createApi from './api.factory'
import googleAuth from 'vue-google-auth'
import { ApiException } from '@/events'

// API's HTTP client instance
const http = axios.create()

// Created on install
let ApiVM

export default {
  connection({ url, endpoints }) {
    if (!ApiVM) {
      const error = new ApiException({
        scope: ['Api', 'connection'],
        message: 'You must install the Api before connecting'
      })

      return error.log()
    }

    // Abort if already mounted
    if (ApiVM.endpoints) return ApiVM

    ApiVM.endpoints = endpoints
    ApiVM.http.defaults.baseURL = url.replace(/\/$/, '')
    return ApiVM
  },

  install(Vue) {
    // Abandon if already installed
    if (ApiVM) return;

    Vue.use(googleAuth, { client_id: '243714525524-fmt02j5u58aromh8cssauau6i3l1if6u.apps.googleusercontent.com' })
    Vue.googleAuth().load()

    // Create the API connection
    ApiVM = new Vue(createApi(http))

    // Provide component level API access
    // and an HTTP client instance for non-API calls
    Vue.prototype.$api = ApiVM
    Vue.prototype.$http = axios.create()
  }
}

export function mapEndpoints(routes) {
  const propagate = (route, endpoints = []) => {
    route.meta = route.meta || {}

    let current = route.meta.endpoints || []
    endpoints = [...endpoints, ...current]

    if (endpoints.length) route.meta.endpoints = endpoints
    if (route.children) route.children = route.children.map(child => propagate(child, endpoints))
    return route
  }

  return routes.map(propagate)
}
