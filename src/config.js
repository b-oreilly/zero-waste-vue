import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://wecycle-backend.herokuapp.com';

export default axios.create({
    baseURL: "https://wecycle-backend.herokuapp.com",
     headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`
     }
})