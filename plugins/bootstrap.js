import jQuery from 'jquery'

if (process.client) {
  window.jQuery = jQuery
  window.$ = jQuery
  require('bootstrap')
}
