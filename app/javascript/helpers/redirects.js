export function redirectToRootPage () {
  location.href = '/'
}

export function redirectToLogin () {
  location.href = '/login'
}

export function refreshPage () {
  window.location = window.location.href.split('?')[0]
}
