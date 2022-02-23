import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000';

export default axios.create({
    baseURL: "http://localhost:8000",
     headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`
     }
})