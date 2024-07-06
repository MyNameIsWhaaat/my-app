import axios from 'axios';

export default async ({email, password}) => {
    try {
        const response = await axios.get(`https://apimet.1lop.ru/login?email=${email}&password=${password}`);
        if(response.data.code !== 200) return null;
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}