import axios from "axios";


export const registerUser = async (payload) =>{
    const response = await axios.post(`http://localhost:4000/api/register`, payload);
    return response;
}

export const saveCroppedImage = async (payload) =>{
    const resp = await axios.post(`http://localhost:4000/api/saveCropped`, payload);
    return resp;
}