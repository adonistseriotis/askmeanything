import jwt_decode from "jwt-decode";
import { isAuthorized, AxiosLogout } from "./axiosConfig";

export const isAuthenticated = async () => {
  return await isAuthorized().then(res => res );
}
export const logout = () => {
  localStorage.removeItem('token');
  AxiosLogout();
}

export const getUsername = () => {
  const token = localStorage.getItem('token');
  if(!token){
    return null;
  }
  else{
      const decoded = jwt_decode(token);
      return decoded.username
  }
}

