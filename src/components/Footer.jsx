import React from 'react';
import styled from 'styled-components';
import { Card, Cell, Link } from '@salutejs/plasma-web';
import { FaVk, FaOdnoklassniki, FaTelegram, FaAppStore, FaGooglePlay, FaStore } from 'react-icons/fa';

const FooterContainer = styled.footer`
    background-color: #1c1c1e;
    color: #ffffff;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`;

const FooterContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 40px;
`;

const FooterColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    min-width: 200px;
`;

const FooterTitle = styled.h3`
    margin-bottom: 10px;
    color: #ffffff;
`;

const FooterBottom = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
`;

const FooterLinks = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const FooterText = styled.p`
    color: #ffffff;
    margin: 0;
    line-height: 1.5;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterColumn>
                    <FooterTitle>Мобильное приложение</FooterTitle>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Веб-версия СберБанк Онлайн</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Малому бизнесу и ИП</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>СберПресс</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>СберТВ</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Ваша безопасность</Link>
                </FooterColumn>
                <FooterColumn>
                    <FooterTitle>О банке</FooterTitle>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Связаться с банком</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Вакансии</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Вопросы и ответы</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Клиентам с инвалидностью</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Офисы и банкоматы</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Курсы валют</Link>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>Политика обработки данных</Link>
                </FooterColumn>
                <FooterColumn>
                    <FooterTitle>Приложения</FooterTitle>
                    <FooterLinks>
                        <FaAppStore size={20} />
                        <Link href="#" target="_blank" style={{ color: '#ffffff', marginLeft: '5px' }}>Откройте в AppGallery</Link>
                    </FooterLinks>
                    <FooterLinks>
                        <FaGooglePlay size={20} />
                        <Link href="#" target="_blank" style={{ color: '#ffffff', marginLeft: '5px' }}>Загрузите на Android</Link>
                    </FooterLinks>
                    <FooterLinks>
                        <FaStore size={20} />
                        <Link href="#" target="_blank" style={{ color: '#ffffff', marginLeft: '5px' }}>Скачайте в RuStore</Link>
                    </FooterLinks>
                    <Link href="#" target="_blank" style={{ color: '#ffffff', marginBottom: '5px' }}>English version</Link>
                </FooterColumn>
            </FooterContent>
            <FooterBottom>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px', color: '#ffffff' }}>
                    <FooterText>
                        Россия, Москва, 117997, ул. Вавилова, 19<br />
                        © 1997—2024 ПАО Сбербанк.<br />
                        Генеральная лицензия Банка России на осуществление банковских операций №1481 от 11.08.2015 г.<br />
                        Информация о процентных ставках по договорам банковского вклада с физическими лицами.<br />
                        Информация, обязательная к размещению.<br />
                        Раскрытие информации о банке как о профессиональном участнике рынка ценных бумаг.<br />
                        На информационном ресурсе применяются рекомендательные технологии.
                    </FooterText>
                    <FooterText style={{ marginTop: '20px' }}>
                        Позвонить: Звонок из приложения СберБанк Онлайн через интернет, бесплатно по Wi-Fi 900. Бесплатно по России при звонке в сети операторов МТС, Билайн, МегаФон, Tele2, Yota, Мотив. Звонок из-за границы: Стоимость звонка зависит от тарифа вашего мобильного оператора.
                    </FooterText>
                    <FooterLinks>
                        <Link href="#" target="_blank" style={{ color: '#ffffff', marginRight: '10px' }}><FaVk size={20} /></Link>
                        <Link href="#" target="_blank" style={{ color: '#ffffff', marginRight: '10px' }}><FaOdnoklassniki size={20} /></Link>
                        <Link href="#" target="_blank" style={{ color: '#ffffff', marginRight: '10px' }}><FaTelegram size={20} /></Link>
                    </FooterLinks>
                </div>
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;
