import { getToken, setToken, removeToken, getTokenFromQuery } from './token'
import { redirectToRootPage, redirectToLogin, refreshPage } from './redirects'

export function signOut () {
  removeToken()
  redirectToLogin()
}

export function signIn (token) {
  setToken(token)
  redirectToRootPage()
}

export function checkAuth () {
  const token = getTokenFromQuery()
  if (token) {
    setToken(token)
    if (getToken()) { refreshPage() }
  }

  if (!token && !getToken()) { redirectToLogin() }
}
