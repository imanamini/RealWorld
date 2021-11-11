import Vue from 'vue'
import $ from 'jquery'
import vuex from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
const tools = {
  $,
  conventionToken(token) {
    if (token !== undefined) {
      if (process.server) {
        this.$store.commit('token', token)
      } else {
        Cookie.set('token', token)
        localStorage.setItem('token', token)
      }
      this.$axios.setHeader('Authorization',token)
    } else if (process.server) {
      return this.$store.state.token
    } else {
      return localStorage.getItem('token') || Cookie.get('token')
    }
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
export { tools,$ }
