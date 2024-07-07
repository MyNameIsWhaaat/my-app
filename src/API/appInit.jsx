import axios from 'axios';

const uploadImage = async (accessToken, imageFile) => {
    if (!accessToken) {
        console.error('Не указан accessToken');
        return null;
    }

    if (!imageFile) {
        console.error('Не передан файл изображения');
        return null;
    }

    try {
        // Создаем FormData объект для передачи файла
        const formData = new FormData();
        formData.append('image', imageFile);

        // Выполняем POST запрос на сервер для загрузки изображения
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
