import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
    // Poor check only temporary
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    else{
        const decoded = jwt_decode(token);
        if(atob(decoded.sodium) === "Alisverisiapo" + decoded.username)
          return true;
        return false;
    }

}
export const logout = () => {
  localStorage.removeItem('token');
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

