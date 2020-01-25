import axios from "axios";

const axiosWithAuth = () =>{
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: token
        }
    });
};


export default axiosWithAuth;


// step 1, created axios with auth/base axios request and set token to localstorage.