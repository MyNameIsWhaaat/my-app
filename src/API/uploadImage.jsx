import axios from 'axios';

const uploadImage = async (imageFile) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Не указан accessToken');
        return null;
    }

    if (!imageFile) {
        console.error('Не передан файл изображения');
        return null;
    }

    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post('https://apimet.1lop.ru/uploadImage', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('Ответ от сервера:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return null;
        }
    }
};

export default uploadImage;