import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";


const AxiosInstance =  axios.create({
    baseURL: 'https://snippet-saver-backend-production.up.railway.app/v1/',
    withCredentials: true,
})

AxiosInstance.interceptors.request.use(
    async (config) => {
        const session : any = await getSession();
        if (session) {
            config.headers['Authorization'] = session.loggedUser;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default AxiosInstance