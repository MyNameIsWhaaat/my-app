import React, { useState, useEffect } from "react";
import { Button, Spinner, addNotification, Headline3, ElasticGrid, Card, CardContent, ButtonGroup, CardBody, CardMedia, CardBadge, BodyM, H4 } from "@salutejs/plasma-web";
import styled from "styled-components";
import getGifts from "../API/getGifts";

const StyledCardBadge = styled(CardBadge)`
    background-color: rgba(255, 0, 0, 0.8); // Задаем нужный фон плашки
    color: white; // Цвет текста
`;

export default () => {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        const fetchEvents = async () => {
            setLoading(true);
            const response = await getGifts();
            setLoading(false);
            if(response && isMounted) setGifts(response.data);
        };
        fetchEvents();
        return () => {
            isMounted = false;
        };
    }, []);

    const cardStyle = {
        background: 'linear-gradient(135deg, rgba(0,179,179,0.8), rgba(0,255,0,0.8))',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom:'30px',
    };
    const Item = {
        width: '100%',
        height: '100px',
        backgroundColor: '#999',
        borderRadius: '10px',
    }
    const props = {
        itemsNumber: 5,
        minColWidth: 250,
        maxColHeight: 300,
        gapX: 8,
        gapY: 8,
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexDirection:"column"}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Card style={cardStyle}>
                    {!loading ? (gifts ? (
                        <ElasticGrid {...props}>
                            {gifts.map((gift) => (
                                <Card style={{ width: '22.5rem' }} background="cadetblue" tabIndex={0} outlined scaleOnFocus>
                                    <CardBody>
                                        <CardMedia src={'https://statmet.1lop.ru/'+gift.image} placeholder={'https://statmet.1lop.ru/'+gift.image} ratio="1/1" />
                                        <CardBadge style={{ left: '1rem', top: '1rem' }} text={gift.price+' бонусов'}/>
                                        <CardContent>
                                            <BodyM>Label</BodyM>
                                            <H4>Tittle</H4>
                                            <BodyM>description</BodyM>
                                        </CardContent>
                                    </CardBody>
                                </Card>
                            ))}
                        </ElasticGrid>
                    ) : (
                        <Headline3>Нет подарков</Headline3>
                    )) : <Spinner size={128} style={{padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>}
                </Card>
            </div>
        </div>
    );
};