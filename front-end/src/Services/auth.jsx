import jwt_decode from "jwt-decode";

const isAuthenticated = () => {
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

export default isAuthenticated;