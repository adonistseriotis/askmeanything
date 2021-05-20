import Axios from 'axios';
import { getUsername } from './auth';

const axiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export async function login(username, password) {
    return await axiosInstance
        .post('/login', {'username': username, 'password': password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.token;
            console.log("Successful login!", response)
            return response
        })
        .catch(error => {
            if(!error.response){
                throw {
                    response: {
                        status: "-1",
                        statusText: "Network Error"
                    }
                }
            }
            throw error
        });
}

export async function signUp(username, password, email) {
    return await axiosInstance
        .post('/signup', {'username':username, 'password': password, 'email':email})
        .then((response) => {
            return login(username,password);
        })
        .catch(error => {throw error});
}

export async function createQuestion(title, body, keywords) {

    const username = getUsername();
    
    return await axiosInstance
        .post('/createquestion', {'title':title, 'body': body, 'username': username, 'keywords':keywords})
        .then((response) => {
            console.log(response)
        })
        .catch(error => {throw error});
}

export default axiosInstance;