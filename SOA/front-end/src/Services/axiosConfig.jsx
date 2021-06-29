import Axios from 'axios';
import { getUsername } from './auth';

const axiosInstanceAuthService = Axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const axiosInstanceDataAccessLayer = Axios.create({
    baseURL: 'http://127.0.0.1:3001',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const axiosInstanceQuestionAnswerService = Axios.create({
    baseURL: 'http://127.0.0.1:3002',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const axiosInstanceAnalyticsService = Axios.create({
    baseURL: 'http://127.0.0.1:3003',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export async function login(username, password) {
    return await axiosInstanceAuthService
        .post('/login', {'username': username, 'password': password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            axiosInstanceAuthService.defaults.headers['Authorization'] = 'Bearer ' + response.data.token;
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

export function AxiosLogout() {
    delete axiosInstanceAnalyticsService.defaults.headers.common["Authorization"];
    delete axiosInstanceAuthService.defaults.headers.common["Authorization"];
    delete axiosInstanceDataAccessLayer.defaults.headers.common["Authorization"];
    delete axiosInstanceQuestionAnswerService.defaults.headers.common["Authorization"];                                                           

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
    
    return await axiosInstanceQuestionAnswerService
        .post('/createQuestion', {'title':title, 'body': body, 'username': username, 'keywords':keywords})
        .then((response) => {
            return response.data
        })
        .catch(error => {throw error});
}

export async function getQuestion(questionID) {

    const username = getUsername();
    
    return await axiosInstanceQuestionAnswerService
        .get('/getQuestion', { params : { questionID: questionID }})
        .then((response) => {
            return response.data
        })
        .catch(error => {throw error});
}

export async function answer(questionID,body) {

    const username = getUsername();
    
    return await axiosInstanceQuestionAnswerService
        .post('/answer', {questionID: questionID, 'body': body, 'username': username})
        .then((response) => {
            return response.data
        })
        .catch(error => {throw error});
}


export async function getFeed() {
    return await axiosInstanceQuestionAnswerService
    .get('/questionFeed')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function getQuestionsPerKeyword() {
    return await axiosInstanceAnalyticsService
    .get('/questionsperkeyword')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function getQuestionsPerDay() {
    return await axiosInstanceAnalyticsService
    .get('/questionsperday')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function isAuthorized() {
    return await axiosInstanceAuthService
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
    return await axiosInstanceQuestionAnswerService
    .get('/myquestions')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function myAnswers() {
    return await axiosInstanceQuestionAnswerService
    .get('/myanswers')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function myQuestionsPerDay() {
    return await axiosInstanceAnalyticsService
    .get('/myquestionsperday')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function search(filter) {
    return await axiosInstanceQuestionAnswerService
    .post('/search', {filter: filter})
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}

export async function getKeywords() {
    return await axiosInstanceQuestionAnswerService
    .get('/keywords')
    .then(response => {
        return response.data
    })
    .catch(error => {throw error});
}
export default axiosInstanceAuthService;