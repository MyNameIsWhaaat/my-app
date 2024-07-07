import React from 'react';
import styled from 'styled-components';
import { Modal, Button, Headline1, Headline3, TextField, Spinner, addNotification, TextArea } from '@salutejs/plasma-web';
import generateDescription from '../API/generateDescription';
import uploadImage from '../API/uploadImage';

const StyledButton = styled(Button)`
    background-color: #f1f5f7;
    color: #000000;
    &:hover {
        background-color: #f0f0f0;
        color: #000000;
    }
`;

const GenerationDescriptionModal = ({ isOpen, onClose, editedEvent, setEditedEvent, setEditing }) => {
    const [text, setText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [description, setDescription] = React.useState(null);
    const [loadingButton, setLoadingButton] = React.useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose} withBlur style={{ width: '100%', maxWidth: '800px' }}>
            {!loading ? <div style={{ padding: '20px' }}>
                <Headline1 style={{ marginBottom: '20px' }}>Генерация описания события</Headline1>
                <Headline3 style={{ marginBottom: '5px' }}>Текст запроса (опишите событие: дату, время, место и т.д.):</Headline3>
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
                        const result = await generateDescription(text);
                        setLoading(false);
                        if (result?.code === 200) {
                            setDescription(result.data);
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
            {description && !loading ? (
                <div style={{ paddingLeft: '20px', paddingRight: '20px', width: 'calc(100%-40px)' }}>
                    <Headline3 style={{ marginBottom: '5px' }}>Результат:</Headline3>
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание..."
                        style={{ marginBottom: '10px', width: '100%' }}
                    />
                    <StyledButton
                        text="Использовать описание"
                        stretch
                        onClick={async () => {
                            setEditedEvent({...editedEvent, description});
                            setEditing(true);
                            setDescription(null);
                            onClose();
                        }}
                        isLoading={loadingButton}
                    />
                </div>
            ) : null}
        </Modal>
    );
};

export default GenerationDescriptionModal;