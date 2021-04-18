import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export function login(username, password) {
    return axiosInstance
        .post('/login', {'username': username, 'password': password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.token;
            console.log("Successful login!", response)
            return response
        })
        .catch(error => console.log(error));
}

export function signUp(username, password, email) {
    return axiosInstance
        .post('/signup', {'username':username, 'password': password, 'email':email})
        .then((response) => {
            return login(username,password);
        })
        .catch(error => console.log(error));
}

export default axiosInstance;