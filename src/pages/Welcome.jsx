import React from 'react';
import { Container, Row, Col } from '@salutejs/plasma-ui/components/Grid';
import { Button } from '@salutejs/plasma-ui';
import { Headline1, TextBoxBigTitle } from '@salutejs/plasma-ui';
import styled from 'styled-components';
import backgroundImage from '../images/welcome.png';

const WelcomeContainer = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextColumn = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; /* Добавлено для центрирования текста по центру */
`;

const ButtonColumn = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; /* Добавлено для центрирования кнопок по центру */
    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

const StyledButton = styled(Button)`
    width: 300px; /* Увеличиваем ширину кнопок до 300px */
    margin-bottom: 10px;
    font-size: 1.5rem;
    padding: 20px 0;
`;

const Welcome = () => (
    <WelcomeContainer>
        <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Row>
                <TextColumn size={{ xs: 12, md: 6 }}>
                    <Headline1 style={{ fontSize: '4rem', color: 'white' }}>
                        СберМотивация
                    </Headline1>
                    <TextBoxBigTitle style={{ fontSize: '2rem', color: 'white' }}>
                        Добро пожаловать на платформу СберМотивация!
                    </TextBoxBigTitle>
                </TextColumn>
                <ButtonColumn size={{ xs: 12, md: 6 }}>
                    <StyledButton
                        view="primary"
                        size="l"
                        style={{ backgroundColor: 'rgba(0, 168, 107, 0.5)', color: 'white' }}
                        onClick={() => window.location.href = "/auth"}
                    >
                        Войти
                    </StyledButton>
                    <StyledButton
                        view="primary"
                        size="l"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'rgb(13, 36, 28)' }}
                        onClick={() => window.location.href = "/reg"}
                    >
                        Зарегистрироваться
                    </StyledButton>
                </ButtonColumn>
            </Row>
        </Container>
    </WelcomeContainer>
);

export default Welcome;
