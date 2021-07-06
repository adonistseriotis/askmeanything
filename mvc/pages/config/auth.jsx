import jwt_decode from "jwt-decode";
import { isAuthorized, AxiosLogout } from "./axiosConfig";
import Cookies from 'js-cookie'
import axios from 'axios'
import { resetWarningCache } from "prop-types";


export const isAuthenticated = async () => {
  return await isAuthorized().then(res => res );
}
export const logout = () => {
  window.localStorage.removeItem('token');
  AxiosLogout();
}

export const getUsername = () => {
  axios.get('/auth/user', {withCredentials: true})
  .then(res => {
    // console.log(res.data.username)
    return res.data.username
  })
  .catch(() =>{
    return null
  })
}

