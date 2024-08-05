import axios from "axios"

export const login = async(value)=>{
    return await axios.post('http://localhost:3000/users/login',value);
};

export const registrar = async(value)=>{
    return await axios.post('http://localhost:3000/users/register',value);
};