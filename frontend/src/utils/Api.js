import path from 'path';
import {configConnection} from "./constants";
class Api {
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

  _setToken() {
    const token = localStorage.getItem("token");
    return {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
    }
}
  getInitialCards() {
    const url = new URL(path.join('cards'), this._url).href;
     return fetch(url, {
       method: "GET",
       headers: this._setToken(),
     })
     .then(this._checkRequest);
   }

   getInfoUserOfServ() {
    const url = new URL(path.join('users', 'me'), this._url).href;
    return fetch(url, {
      method: "GET",
      headers: this._setToken(),
    }).then(this._checkRequest);
  }

  setNewUserInfo(data) {
    const url = new URL(path.join('users', 'me'), this._url).href;
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ name: data.name, about: data.about }),
      headers: this._setToken(),
    }).then(this._checkRequest);
  }

  setNewCard(body) {
    const url = new URL(path.join('cards'), this._url).href;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: this._setToken(),
    }).then(this._checkRequest);
  }
  likeCard(cardId, isLiked) {
    const url = new URL(path.join('cards', cardId, 'likes'), this._url).href;
    return fetch(url, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._setToken(),
    })
      .then(this._checkRequest);
  }
  setAvatar(avatar) {
    const url = new URL(path.join('users', 'me', 'avatar'), this._url).href;
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify(avatar),
      headers: this._setToken(),
    })
      .then(this._checkRequest)

  }
  deleteCard(cardId) {
    const url = new URL(path.join('cards', cardId), this._url).href;
    return fetch(url, {
      method: "DELETE",
      headers: this._setToken(),
    }).then(this._checkRequest);
  }
 
}

const api = new Api(configConnection);
export { api };

