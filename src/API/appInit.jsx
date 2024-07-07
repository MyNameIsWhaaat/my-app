import axios from 'axios';

export default async (accessToken) => {
    console.log(accessToken)
    if(!accessToken) return null;
    try {
        const response = await axios.get(`https://apimet.1lop.ru/appInit`, {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        if(error?.response?.data) return error.response.data;
        else return null;
    }
}