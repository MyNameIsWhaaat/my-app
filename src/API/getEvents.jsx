import axios from 'axios';

export default async () => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return null;
    try {
        const response = await axios.get(`https://apimet.1lop.ru/getEvents`, {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        if(error?.response?.data) return error.response.data;
        else return null;
    }
}