import React, { useState } from 'react';

const Auth = () => {
    const [formData, setFormData] = useState({});
    const [userFound, setUserFound] = useState(false); // добавляем состояние userFound

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `https://apimet.1lop.ru/login?email=${formData.email}&password=${formData.password}`;
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Ошибка HTTP: ' + response.status);
            }
    
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setUserFound(true);
            } else {
                throw new Error('Неверный формат данных');
            }
        } catch (error) {
            console.error('Ошибка проверки пользователя:', error);
        }
    };

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" onChange={handleInputChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} required />
                </label>
                <button type="submit">Submit</button>
            </form>
            {userFound && <p>Пользователь найден в базе данных!</p>}
        </div>
    );
};

export default Auth;