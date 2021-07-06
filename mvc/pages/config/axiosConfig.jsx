import Axios from 'axios';
import { getUsername } from './auth';

const axiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:8001',
    timeout: 5000,
    headers: {
        // 'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export async function login(username, password) {
    return await axiosInstance
        .post('/login', {'username': username, 'password': password})
        .then((response) => {
            // window.localStorage.setItem('token', response.data.token);
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.token;
            // console.log("Successful login!", response)
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

export function AxiosLogout() {
    delete axiosInstance.defaults.headers.common["Authorization"];                                                          
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
        .post('/createQuestion', {'title':title, 'body': body, 'username': username, 'keywords':keywords})
        .then((response) => {
            return response.data
        })
        .catch(error => {throw error});
}

export async function getQuestion(questionID) {

    const username = getUsername();
    
    return await axiosInstance
        .get('/getQuestion', { params : { questionID: questionID }})
        .then((response) => {
            return response.data
        })
        .catch(error => {throw error});
}

export async function answer(questionID,body) {

    const username = getUsername();
    
    return await axiosInstance
        .post('/answer', {questionID: questionID, 'body': body, 'username': 'adonis'})
        .then((response) => {
            return response.data
        })
        .catch(error => {throw error});
}


export async function getFeed() {
    return await axiosInstance
    .get('/questionFeed')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function getQuestionsPerKeyword() {
    return await axiosInstance
    .get('/questionsperkeyword')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function getQuestionsPerDay() {
    return await axiosInstance
    .get('/questionsperday')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function isAuthorized() {
    return await axiosInstance
    .post('/authorize')
    .then(res => {
        console.log(res.data)
        if(res.status === 204)
            throw {
                response: {
                    data: "No content"
                }
            }
        return true
    })
    .catch(err => {
        console.error(err.response.data)
        return false
    })
}

export async function myQuestions() {
    return await axiosInstance
    .get('/myquestions')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function myAnswers() {
    return await axiosInstance
    .get('/myanswers')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function myQuestionsPerDay() {
    return await axiosInstance
    .get('/myquestionsperday')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function search(filter) {
    return await axiosInstance
    .post('/search', {filter: filter})
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function getKeywords() {
    return await axiosInstance
    .get('/keywords')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}
export default axiosInstance;