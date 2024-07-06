import React, { useState } from 'react';
import { Button, TextField, Card, CardBody, CardContent, CardMedia } from '@salutejs/plasma-web';
import login from '../API/login.jsx';
import sber from '../assets/sber_ru_green.png';

const Auth = () => {
    const [formData, setFormData] = useState({});
    const [userFound, setUserFound] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(formData);
        if (user) {
            setUserFound(true);
            // Обработка успешного входа
        } else {
            setUserFound(false);
            // Обработка ошибки входа
        }
    };

    return (
        <div className="auth-container">
            <div className="logo-container">
                <img src={sber} alt="Логотип СберБанка"/>
            </div>
            <Card className="auth-card">
                <CardBody>
                    <CardContent>
                        <h1>Вход в СберМотивация</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField label="Email" type="email" name="email" onChange={handleInputChange} required />
                            <TextField label="Password" type="password" name="password" onChange={handleInputChange} required />
                            <Button text="Войти" view="primary" type="submit" />
                        </form>
                        {userFound && <p>Пользователь найден в базе данных!</p>}
                    </CardContent>
                </CardBody>
            </Card>
        </div>
    );
};

export default Auth;
