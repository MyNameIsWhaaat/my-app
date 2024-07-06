import React, { useState } from 'react';
import login from '../API/login.jsx';

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
        console.log(user)
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