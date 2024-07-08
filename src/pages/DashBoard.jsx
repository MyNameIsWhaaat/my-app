import React, { useState, useEffect } from "react";
import { Button } from "@salutejs/plasma-web";
import Header from "../components/Header.jsx";
import Events from "./Events.jsx";
import MyTickets from "./MyTickets.jsx";
import Gifts from "./Gifts.jsx";
import Footer from "../components/Footer.jsx";
import Community from "./Community.jsx";


export default () => {
    const accessToken = localStorage.getItem('accessToken');
    const [tab, setTab] = useState(Number(localStorage.getItem('tab')) || 0);

    useEffect(() => {
        if (!accessToken) {
            window.location.href = "/";
        }

        // Функция для проверки изменений в localStorage
        const checkTabChange = () => {
            const newTab = Number(localStorage.getItem('tab'));
            if (newTab !== tab) {
                setTab(newTab);
            }
        };

        // Установка интервала для регулярной проверки изменений
        const intervalId = setInterval(checkTabChange, 1000); // Проверка каждую секунду

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [tab, accessToken]);

    return (
        <div>
            <Header />
            {tab === 0 && <Events />}
            {tab === 1 && <MyTickets />}
            {tab === 2 && <Gifts />}
            <Footer />
        </div>
    );
};