import Vue from 'vue'
import $ from 'jquery'
import vuex from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined
const tools = {
  $,
  /**
   * Set & get token
   *
   * When register/login we set token in localStorage, cookie & store
   * and when we must check auth we get token from this function
   *
   * Author: Iman Amini
   * last edit: 1400/08/21 by Iman Amini
   * inspector:
   *
   * @param token is jwt that we set from api
   * @return {string} is saved jwt that we get from storages
   *
   */
  conventionToken(token) {
    if (token !== undefined) {
      if (process.server) {
        this.$store.commit('token', token)
      } else {
        Cookie.set('token', token)
        localStorage.setItem('token', token)
      }
    } else if (process.server) {
      return this.$store.state.token
    } else {
      return localStorage.getItem('token') || Cookie.get('token')
    }
  },
  /**
   * Check authenticated user
   *
   * Author: Iman Amini
   * last edit: 1400/08/21 by Iman Amini
   * inspector:
   *
   * @return {boolean}
   */
  isAuthenticated() {
    return !!(tools.parseJwt() && tools.parseJwt().username)
  },
  /**
   * Parse jwt
   *
   * Parse jwt to get username, image, bio & ...
   *
   * Author: Iman Amini
   * last edit: 1400/08/21 by Iman Amini
   * inspector:
   *
   */
  parseJwt() {
    const token = tools.conventionToken()
    if (!token || !token.includes('.')) return {}
    const base64Url = token.split('.')[1]
    if (!base64Url) {
      return ''
    }
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    try {
      return JSON.parse(atob(base64))
    } catch (e) {
      tools.conventionToken('')
    }
  },
  /**
   * Check url
   *
   * Check if url exist, return true
   *
   * Author: Iman Amini
   * last edit: 1400/08/23 by Iman Amini
   * inspector:
   *
   * @param page
   * @return {boolean}
   */
  checkUrl(page) {
    const url = this.$route.fullPath
    let flag = false
    if (url.includes(page)) {
      flag = true
    }
    return flag
  },
  showToastMessage(text, close = false) {
    this.$('.toast').append(
      '<div class="toast-body fs-16 p-0 d-flex align-items-center justify-content-around w-100"><span>' +
        text +
        '</span></div>'
    )
    if (close) {
      this.$('.toast-body').append(
        '<button type="button" class="ml-auto mb-1 close" data-dismiss="toast" aria-label="Close"> <span aria-hidden="true">&times;</span></button>'
      )
      this.$('.toast-body button').click(() => {
        this.$('.toast').toast('hide')
      })
    }
    this.$('.toast').toast('show')
  },
  convertDate(date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const translateDate = {
      year: date.substring(0, 4),
      month: months[date.substring(5, 7) - 1],
      day: date.substring(8, 10),
    }
    return (
      translateDate.month + ' ' + translateDate.day + ' ,' + translateDate.year
    )
  },
}
Vue.mixin({
  methods: {
    ...tools,
  },
})
Vue.use(vuex)
/** Sets client config */
if (process.client) {
  window.tools = tools
}
export default ({ $axios, env }) => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Token ${
      localStorage.getItem('token') || Cookie.get('token')
    }`
  })
}
export { tools, $ }
