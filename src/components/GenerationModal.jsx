import React from 'react';
import styled from 'styled-components';
import { Modal, Button, Headline1, Headline3, TextField, Spinner, addNotification } from '@salutejs/plasma-web';
import generateImage from '../API/generateImage';
import uploadImage from '../API/uploadImage';

const StyledButton = styled(Button)`
    background-color: #f1f5f7;
    color: #000000;
    &:hover {
        background-color: #f0f0f0;
        color: #000000;
    }
`;

const ImageGenerationModal = ({ isOpen, onClose, editedEvent, setEditedEvent, setEditing }) => {
    const [text, setText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [loadingButton, setLoadingButton] = React.useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose} withBlur style={{ width: '100%', maxWidth: '800px' }}>
            {!loading ? <div style={{ padding: '20px' }}>
                <Headline1 style={{ marginBottom: '20px' }}>Генерация изображения</Headline1>
                <Headline3 style={{ marginBottom: '5px' }}>Текст запроса:</Headline3>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ваш запрос..."
                    maxLength={250}
                    style={{ marginBottom: '10px' }}
                />
                <StyledButton
                    text="Генерировать"
                    stretch
                    onClick={async () => {
                        if (text.length < 1) return;
                        setLoading(true);
                        const result = await generateImage(text);
                        setLoading(false);
                        if (result?.code === 200) {
                            setImage(result.data);
                        } else addNotification({
                            title: result.message,
                            children: "Код ошибки: " + result.code,
                            showCloseIcon: false
                        }, 2000);
                    }}
                    isLoading={loading}
                />
            </div> : (
                <Spinner size={64} style={{padding: '40px'}}/>
            )}
            {image && !loading ? (
                <div style={{ paddingLeft: '20px', paddingRight: '20px', width: '256px' }}>
                    <Headline3 style={{ marginBottom: '5px' }}>Результат:</Headline3>
                    <img src={'data:image/png;base64,' + image} style={{ height: '256px', width: '256px' }}/>
                    <StyledButton
                        text="Использовать изображение"
                        stretch
                        onClick={async () => {
                            setLoadingButton(true);
                            let res = await uploadImage('data:image/png;base64,' + image);
                            if (res?.code === 200) {
                                setEditedEvent({...editedEvent, image: res.data});
                                setEditing(true);
                                setLoadingButton(false);
                                setImage(null);
                                onClose();
                            } else addNotification({
                                title: res.message,
                                children: "Код ошибки: " + res.code,
                                showCloseIcon: false
                            }, 2000);
                        }}
                        isLoading={loadingButton}
                    />
                </div>
            ) : null}
        </Modal>
    );
};

export default ImageGenerationModal;