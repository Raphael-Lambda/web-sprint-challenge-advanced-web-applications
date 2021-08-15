import axios from "axios";

const credentials = localStorage.getItem('token')

export const axiosWithAuth = () => {
    return axios.create({
        headers: {
            authorization: credentials, 
        },
    })
}
//Task List:
//Build and export a function used to send in our authorization token