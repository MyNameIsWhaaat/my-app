import axios from 'axios';

const getTickets = async ({title, description, firstDate, secondDate, image}) => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return null;
    try {
        const response = await axios.get(`https://apimet.1lop.ru/createEvent?title=${title}&description=${description}&firstDate=${firstDate}&secondDate=${secondDate}&image=${image}`, {
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

export default getTickets;