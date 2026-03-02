export function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function setToken(token) {
  localStorage.setItem("token", token)
}

export function removeToken() {
  localStorage.removeItem("token")
}

export function isLoggedIn() {
  return !!getToken()
}