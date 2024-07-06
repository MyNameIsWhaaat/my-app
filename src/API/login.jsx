import axios from 'axios';

export default async ({email, password}) => {
    try {
        const response = await axios.get(`https://apimet.1lop.ru/login?email=${email}&password=${password}`);
        return response.data;
    } catch (error) {
        console.error(error);
        if(error?.response?.data) return error.response.data;
        else return null;
    }
}