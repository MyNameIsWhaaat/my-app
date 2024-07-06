import React, { useState } from 'react';
import { Button, TextField, Card, CardBody, CardContent, CardMedia, addNotification } from '@salutejs/plasma-web';
import login from '../API/login.jsx';
import appInit from '../API/appInit.jsx';
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
        function notification(res){
            addNotification({
                title: res.message,
                children: "Код ошибки: " + res.code,
                showCloseIcon: false
            }, 2000);
        }
        setLoading(true);
        let result = await login(formData);
        if(result?.code==200){
            const {accessToken} = result.data;
            console.log(accessToken)
            localStorage.setItem('accessToken', accessToken);
            result = await appInit(accessToken);
            console.log(result)
            setLoading(false);
            //if(result?.code==200) localStorage.setItem('userInfo', JSON.stringify(result.data));
            //else if(result.message && result.code) notification(result);
            //window.location.href = "/dashboard";
        } else if(result.message && result.code) notification(result);
    }, [formData]);
    const accessToken = localStorage.getItem('accessToken');
    //if(accessToken) window.location.href = "/dashboard";

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
