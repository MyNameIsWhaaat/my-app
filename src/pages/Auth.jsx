import React, { useState } from 'react';
import { Button, TextField, Card, CardBody, CardContent, CardMedia, addNotification } from '@salutejs/plasma-web';
import login from '../API/login.jsx';
import sber from '../assets/sber_ru_green.png';

const Auth = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = React.useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login(formData)
        setLoading(false);
        if(result?.code==200){
            localStorage.setItem('accessToken', result.accessToken);
            
        } else {
            addNotification({
                title: result.message,
                children: "Код ошибки: " + result.code,
                showCloseIcon: false
            }, 1000);
        }
    }, []);

    return (
        <div className="auth-container">
            <div className="logo-container" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                <img src={sber} alt="Логотип СберБанка"/>
            </div>
            <Card className="auth-card" background="white">
                <CardBody>
                    <CardContent coverGradient>
                        <h1 style={{textAlign: "left"}}>Вход в СберМотивация</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField type="email" name="email" onChange={handleInputChange} required placeholder={"Введите почту"} style={{marginBottom: 20}}/>
                            <TextField type="password" name="password" onChange={handleInputChange} required placeholder={"Пароль"} style={{marginBottom: 20}}/>
                            <Button text="Войти" type="submit" stretching="filled" view="success" outlined style={{marginBottom: 20}} isLoading={loading}/>
                            <Button view="white" text="Регистрация" stretch="horizontal" onClick={() => window.location.href = "/reg"} outlined/>
                        </form>
                    </CardContent>
                </CardBody>
            </Card>
        </div>
    );
};

export default Auth;
