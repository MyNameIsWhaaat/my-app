import React, { useState } from 'react';
import { Button, TextField, Card, CardBody, CardContent, CardMedia, addNotification } from '@salutejs/plasma-web';
import register from '../API/register.jsx';
import sber from '../assets/sber_ru_green.png';

const Reg = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) window.location.href = "/dashboard";

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = React.useCallback(async (e) => {
        console.log(formData)
        e.preventDefault();
        setLoading(true);
        const result = await register(formData);
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
                        <h1 style={{textAlign: "left"}}>Регистрация в СберМотивация</h1>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <TextField type="text" name="firstname" onChange={handleInputChange} required placeholder={"Введите ваше имя"} style={{marginBottom: 20, flexGrow: 1, marginRight: '8px'}}/>
                                <TextField type="text" name="lastname" onChange={handleInputChange} required placeholder={"Введите вашу фамилию"} style={{marginBottom: 20, flexGrow: 1}}/>
                            </div>
                            <TextField type="email" name="email" onChange={handleInputChange} required placeholder={"Введите почту"} style={{marginBottom: 20}}/>
                            <TextField type="password" name="password" onChange={handleInputChange} required placeholder={"Пароль"} style={{marginBottom: 20}}/>
                            <Button text="Зарегистрироваться" type="submit" stretching="filled" view="success" outlined style={{marginBottom: 20}} isLoading={loading}/>
                            <Button view="white" text="Войти (уже есть аккаунт)" stretch="horizontal" onClick={() => window.location.href = "/auth"} outlined/>
                        </form>
                    </CardContent>
                </CardBody>
            </Card>
        </div>
    );
};

export default Reg;
