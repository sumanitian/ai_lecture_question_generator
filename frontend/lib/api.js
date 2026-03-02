import { getToken } from "./auth"

export async function apiFetch(url, options = {}) {

  const token = getToken()

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: "Bearer " + token
    }
  })

  return res
}