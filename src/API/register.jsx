import axios from 'axios';

const register = async ({email, password, firstname, lastname}) => {
    try {
        const response = await axios.get(`https://apimet.1lop.ru/register?email=${email}&password=${password}&firstname=${firstname}&lastname=${lastname}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        if(error?.response?.data) return error.response.data;
        else return null;
    }
}

export default register;