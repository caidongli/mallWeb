
const TokenKey = 'loginToken'

export function getToken() {
  let token = sessionStorage.getItem(TokenKey);
  return token;
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}
