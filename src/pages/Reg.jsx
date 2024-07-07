import React, { useState } from 'react';
import { Button, TextField, Card, CardBody, CardContent, CardMedia, addNotification } from '@salutejs/plasma-web';
import register from '../API/register.jsx';
import appInit from '../API/appInit.jsx';
import sber from '../assets/sber_ru_green.png';

const Reg = () => {
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
        function notification(res){
            addNotification({
                title: res.message,
                children: "Код ошибки: " + res.code,
                showCloseIcon: false
            }, 2000);
        }
        setLoading(true);
        const result = await register(formData);
        if(result?.code==200){
            const {accessToken} = result.data;
            console.log(accessToken)
            localStorage.setItem('accessToken', accessToken);
            const res = await appInit(accessToken);
            setLoading(false);
            if(res?.code==200) localStorage.setItem('userInfo', JSON.stringify(res.data));
            else if(res.message && res.code) notification(res);
            window.location.href = "/dashboard";
        } else if(result.message && result.code) notification(result);
    }, [formData]);
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) window.location.href = "/dashboard";

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
