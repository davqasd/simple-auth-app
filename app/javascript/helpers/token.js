import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'

const headerName = 'Authorization'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export function getToken () {
  return Cookies.get(headerName)
}

export function removeToken () {
  Cookies.remove(headerName)
}

export function setToken (token) {
  Cookies.set(headerName, token)
}

export function getTokenFromQuery () {
  return useQuery().get('token')
}
