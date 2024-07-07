import React, { useState } from 'react';
import {
    Modal,
    Image,
    TextArea,
    Button,
    Editable,
    Headline3,
    ButtonGroup,
    addNotification
} from '@salutejs/plasma-web';
import styled from 'styled-components';
import { IconEdit, IconClose } from '@salutejs/plasma-icons';
import uploadImage from '../API/uploadImage';
import changeEvent from '../API/changeEvent';
import formatDateTime from '../func/formatDateTime';
import GenerationModal from './GenerationModal';

const StyledButton = styled(Button)`
    background-color: #f1f5f7;
    color: #000000;
    &:hover {
        background-color: #f0f0f0;
        color: #000000;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ImageUploader = ({ onChange, style }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) onChange(file);
    };

    return (
        <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <div
                style={{
                    ...style,
                    border: '1px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                Загрузить изображение
            </div>
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </label>
    );
};

const MoreEventModal = ({ isOpen, onClose, event, isAdmin }) => {
    const [editing, setEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);
    const [editedStartDate, setEditedStartDate] = useState(event.firstDate ? new Date(event.firstDate).toISOString().slice(0, -1) : ''); // Дата начала редактирования
    const [editedEndDate, setEditedEndDate] = useState(event.secondDate ? new Date(event.secondDate).toISOString().slice(0, -1) : ''); // Дата окончания редактирования
    const [genModalOpen, setGenModalOpen] = useState(false); // Состояние для модального окна генерации изображения

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedEvent(null);
    };

    const handleSaveEdit = async () => {
        const data = {
            ...event,
            ...editedEvent,
            firstDate: editedStartDate,
            secondDate: editedEndDate
        };
        console.log(data);
        const res = await changeEvent(data);
        if (res?.code === 200) {
            setEditing(false);
            setEditedEvent(null);
            onClose();
        } else {
            addNotification({
                title: res.message,
                children: "Код ошибки: " + res.code,
                showCloseIcon: false
            }, 2000);
        }
    };

    const handleDeleteImage = () => {
        // Здесь можно добавить логику удаления изображения
        console.log('Удаление изображения', editedEvent);
        setEditedEvent({ ...editedEvent, image: true });
    };

    const handleUploadImage = async (file) => {
        try {
            console.log('Загрузка изображения', file);
            const imageUrl = await uploadImage(file); // Вызываем функцию загрузки изображения
            if(imageUrl){
                setEditing(true);
                setEditedEvent({ ...editedEvent, image: imageUrl.data });
            } // Сохраняем URL изображения в состоянии
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            // Можно добавить обработку ошибок, если необходимо
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} withBlur style={{ width: '100%', maxWidth: '800px', paddingRight: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                    {((event.image && !editedEvent?.image) || (editedEvent?.image && editedEvent?.image !== true) || !isAdmin) && (event.image || editedEvent?.image) ? (
                        <ImageContainer>
                            <Image
                                src={'https://statmet.1lop.ru/'+((editedEvent?.image && editedEvent?.image!==true) ? editedEvent.image : event.image)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            {isAdmin ? <CloseButton onClick={handleDeleteImage}>
                                <IconClose size="s" />
                            </CloseButton> : null}
                        </ImageContainer>
                    ) : (isAdmin ? (
                        <div width='200px'>
                            <ImageUploader onChange={handleUploadImage} style={{ width: '200px', height: '200px' }}/>
                            <StyledButton size='xs' style={{marginTop: '10px'}} stretching='filled' onClick={() => setGenModalOpen(true)}>Сгенерировать изображение</StyledButton>
                        </div>
                    ) : null)}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '10px' }}>
                        <Headline3>Название события:</Headline3>
                        {isAdmin ? (
                            <Editable
                                icon={<IconEdit size='s' color="inherit" />}
                                textComponent={Headline3}
                                value={editedEvent?.title || event.title}
                                onChange={(e) => {
                                    setEditing(true);
                                    setEditedEvent({ ...editedEvent, title: e.target.outerText });
                                }}
                                placeholder="Название события"
                                maxLength={50}
                            />  
                        ) : (
                            <Headline3>{editedEvent?.title || event.title}</Headline3>
                        )}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Headline3>Дата:</Headline3>
                        {editing && isAdmin ? (
                            <>
                                <input
                                    type="datetime-local"
                                    value={editedStartDate}
                                    onChange={(e) => setEditedStartDate(e.target.value)}
                                    style={{ marginRight: '10px' }}
                                />&mdash;
                                <input
                                    type="datetime-local"
                                    value={editedEndDate}
                                    onChange={(e) => setEditedEndDate(e.target.value)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </>
                        ) : (isAdmin ?
                            <Editable
                                icon={<IconEdit size='s' color="inherit" />}
                                textComponent={Headline3}
                                value={formatDateTime(event.firstDate, event.secondDate)}
                                onClick={() => setEditing(true)}
                                placeholder="Дата"
                                maxLength={50}
                            />
                        : formatDateTime(event.firstDate, event.secondDate))}
                    </div>
                    <Headline3>Описание:</Headline3>
                    {
                        isAdmin ? (
                            <TextArea
                                placeholder="Описание события"
                                value={editedEvent?.description || event.description}
                                onChange={(e) => {
                                    setEditing(true);
                                    setEditedEvent({ ...editedEvent, description: e.target.value });
                                }}
                                rows={4}
                                style={{width: '500px'}}
                            />
                        ) : (
                            <Headline3 style={{ wordBreak: 'break-word' }}>{editedEvent?.description || event.description}</Headline3>
                        )
                    }
                    {editing ? (
                        <div style={{ marginBottom: '10px' }}>
                            <div style={{ marginTop: '10px' }}>
                                <ButtonGroup size="xs" shape="segmented">
                                    <StyledButton text="Сохранить" onClick={handleSaveEdit} />
                                    <StyledButton text="Отмена" onClick={handleCancelEdit} />
                                </ButtonGroup>
                            </div>
                        </div>
                    ) : null}
                    {genModalOpen &&
                    <GenerationModal
                        isOpen={genModalOpen}
                        onClose={() => setGenModalOpen(false)}
                        editedEvent={editedEvent}
                        setEditedEvent={setEditedEvent}
                        setEditing={setEditing}
                    />}
                </div>
            </div>
        </Modal>
    );
};

export default MoreEventModal;