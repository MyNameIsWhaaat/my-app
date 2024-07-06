import React from 'react';
import { Container, Row, Col } from '@salutejs/plasma-ui/components/Grid';
import { Button } from '@salutejs/plasma-ui';
import { Headline1, TextBoxBigTitle, TextBox } from '@salutejs/plasma-ui';

// Добавьте URL вашей фоновой картинки
import backgroundImage from '../images/welcome.png';

const Welcome = () => (
    <>
        <Container
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                minWidth:'100vh',
                display:'flex',
                justifyContent:'center',
                flexDirection:'row',
                alignItems:'center' 

            }}
        >
        <Row>
            <Row style={{ marginRight:'250px' }}>
                <Col   style={{ display: 'flex', justifyContent: 'center', alignItems:'flex-start',  flexDirection:'column', width:'100%',}}>
                    <Headline1 style={{ textAlign:'start', fontSize: '4rem', color: 'white' }}>
                        СберМотивация
                    </Headline1>
                    <TextBoxBigTitle style={{ textAlign: 'left', fontSize: '2rem', color: 'white' }}>
                            Добро пожаловать на платформу!
                        </TextBoxBigTitle>
                </Col>
                 
            </Row>
            <Row style={{ minHeight: '100vh' }}>
                
                <Col  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
                        <Button view="primary" size="l" style={{  backgroundColor: 'rgba(0, 168, 107, 0.5)', color: 'white', fontSize: '2rem', padding: '30px 165px', marginBottom: '10px' }} onClick={() => window.location.href = "/auth"}>
                            Войти
                        </Button>
                        <Button view="primary" size="l" style={{  backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'rgb(13, 36, 28)', fontSize: '2rem', padding: '30px 45px' }} onClick={() => window.location.href = "/reg"}>
                            Зарегистрироваться
                        </Button>
                    </div>
                </Col>
            </Row>
        </Row>
        </Container>
    </>
);

export default Welcome;