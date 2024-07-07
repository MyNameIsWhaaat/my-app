import axios from 'axios';

const uploadImage = async (imageFileOrBase64) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Не указан accessToken');
        return null;
    }

    if (!imageFileOrBase64) {
        console.error('Не передан файл изображения или base64 строка');
        return null;
    }

    try {
        let response;

        if (typeof imageFileOrBase64 === 'string' && imageFileOrBase64.startsWith('data:image/')) {
            // Если это base64 строка
            response = await axios.post('https://apimet.1lop.ru/uploadImage', {
                imageBase64: imageFileOrBase64
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } else {
            // Если это файл изображения
            const formData = new FormData();
            formData.append('image', imageFileOrBase64);

            response = await axios.post('https://apimet.1lop.ru/uploadImage', formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

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
