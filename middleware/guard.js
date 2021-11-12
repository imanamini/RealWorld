import { tools } from '~/plugins'
export default function (context) {
  if (
    context.route.fullPath !== '/login' &&
    !tools.isAuthenticated() &&
    context.route.fullPath !== '/register'
  ) {
    context.redirect({ path: '/login', status: 200 })
  }

  if (context.route.fullPath === '/register' && tools.isAuthenticated()) {
    context.redirect({ path: '/dashboard', status: 200 })
  }
  if (context.route.fullPath === '/' && tools.isAuthenticated()) {
    context.redirect({ path: '/dashboard', status: 200 })
  }
  if (context.route.fullPath === '/login' && tools.isAuthenticated()) {
    context.redirect({ path: '/dashboard', status: 200 })
  }
}
