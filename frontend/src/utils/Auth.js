import path from 'path';
import { authConfigConnection } from "./constants";
class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText);
    }
  }
  register({ password, email }) {
    const url = new URL(path.join('signup'), this._url).href;
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    }).then(this._checkRequest);
  } ;

  authorize({ password, email }) {
    const url = new URL(path.join('signin'), this._url).href;
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkRequest)
 }
  getContent(token) {
    const url = new URL(path.join('users', 'me'), this._url).href;
    return fetch(url, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._checkRequest)
  }
}
const auth = new Auth(authConfigConnection);
export { auth };