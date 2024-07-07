import React, { useState, useEffect } from "react";
import { Button, Spinner, addNotification, Headline3, ElasticGrid, Card, CardContent, ButtonGroup, CardBody, CardMedia, CardBadge, BodyM, H4 } from "@salutejs/plasma-web";
import styled from "styled-components";
import getGifts from "../API/getGifts";
import getBalance from "../API/getBalance";

const StyledCardBadge = styled(CardBadge)`
    background-color: #f1f5f7; // Задаем нужный фон плашки
    color: black; // Цвет текста
`;

const BalanceContainer = styled.div`
    background-color: #f1f5f7;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 30px;
    max-width: 800px;
    width: 100%;
`;

const BalanceText = styled(H4)`
    margin: 0;
`;

export default () => {
    const [gifts, setGifts] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchEvents = async () => {
            setLoading(true);
            const response = await getGifts();
            const res = await getBalance();
            setLoading(false);
            if (response && res && isMounted) {
                setGifts(response.data);
                setBalance(res.data.balance); // Убедитесь, что поле balance существует в res.data
            }
        };
        fetchEvents();
        return () => {
            isMounted = false;
        };
    }, []);

    const cardStyle = {
        background: '#f1f5f7',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom: '30px',
    };

    const props = {
        itemsNumber: 5,
        minColWidth: 250,
        maxColHeight: 300,
        gapX: 8,
        gapY: 8,
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexDirection: "column" }}>
            <BalanceContainer>
                <BalanceText>Ваш баланс: {balance} бонусов</BalanceText>
            </BalanceContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={cardStyle}>
                    {!loading ? (gifts ? (
                        <ElasticGrid {...props}>
                            {gifts.map((gift) => (
                                <Card style={{ width: '22.5rem' }} background="linear-gradient(135deg, rgba(0,179,179,0.8), rgba(0,255,0,0.8))" tabIndex={0} outlined scaleOnFocus>
                                    <CardBody>
                                        <CardMedia src={'https://statmet.1lop.ru/' + gift.image} placeholder={'https://statmet.1lop.ru/' + gift.image} ratio="1/1" />
                                        <StyledCardBadge style={{ left: '1rem', top: '1rem' }} text={gift.price + ' бонусов'} />
                                        <CardContent>
                                            <H4>{gift.title}</H4>
                                            <BodyM>{gift.description}</BodyM>
                                            <Button onClick={() => alert('Преобрести')}>Преобрести</Button>
                                        </CardContent>
                                    </CardBody>
                                </Card>
                            ))}
                        </ElasticGrid>
                    ) : (
                        <Headline3>Нет подарков</Headline3>
                    )) : <Spinner size={128} style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />}
                </Card>
            </div>
        </div>
    );
};
