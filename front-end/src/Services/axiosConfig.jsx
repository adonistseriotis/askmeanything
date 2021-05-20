import Axios from 'axios';
import { getUsername } from './auth';

const axiosInstanceAuthService = Axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const axiosInstanceDataAccessLayer = Axios.create({
    baseURL: 'http://127.0.0.1:3001',
    timeout: 5000,
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export async function login(username, password) {
    return await axiosInstanceAuthService
        .post('/login', {'username': username, 'password': password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            axiosInstanceAuthService.defaults.headers['Authorization'] = 'JWT ' + response.data.token;
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
    return await axiosInstanceAuthService
        .post('/signup', {'username':username, 'password': password, 'email':email})
        .then((response) => {
            return login(username,password);
        })
        .catch(error => {throw error});
}

export async function createQuestion(title, body, keywords) {

    const username = getUsername();
    
    return await axiosInstanceDataAccessLayer
        .post('/createquestion', {'title':title, 'body': body, 'username': username, 'keywords':keywords})
        .then((response) => {
            console.log(response)
        })
        .catch(error => {throw error});
}

export default axiosInstanceAuthService;