import React, { useState } from 'react';
import {
    Modal,
    Image,
    TextArea,
    Button,
    Editable,
    Headline3
} from '@salutejs/plasma-web';
import styled from 'styled-components';
import uploadImage from '../API/uploadImage';
import formatDateTime from '../func/formatDateTime';
import { IconEdit } from '@salutejs/plasma-icons';

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
                    justifyContent: 'center',
                    marginRight: '20px',
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

const MoreEventModal = ({ isOpen, onClose, event }) => {
    const [editing, setEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);
    const [editedStartDate, setEditedStartDate] = useState(event.firstDate ? new Date(event.firstDate).toISOString().slice(0, -1) : ''); // Дата начала редактирования
    const [editedEndDate, setEditedEndDate] = useState(event.secondDate ? new Date(event.secondDate).toISOString().slice(0, -1) : ''); // Дата окончания редактирования

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedEvent(null);
    };

    const handleSaveEdit = () => {
        // Здесь можно добавить логику сохранения изменений
        console.log('Сохранение изменений', editedEvent);
        setEditedEvent(null);
        setEditing(false);
    };

    const handleDeleteImage = () => {
        // Здесь можно добавить логику удаления изображения
        console.log('Удаление изображения', editedEvent);
        setEditedEvent({ ...editedEvent, imageUrl: null });
    };

    const handleUploadImage = async (file) => {
        try {
            console.log('Загрузка изображения', file);
            const imageUrl = await uploadImage(file); // Вызываем функцию загрузки изображения
            if(imageUrl) setEditedEvent({ ...editedEvent, image: 'htp' }); // Сохраняем URL изображения в состоянии
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            // Можно добавить обработку ошибок, если необходимо
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} withBlur style={{ width: '100%', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                    {editedEvent?.imageUrl ? (
                        <Image
                            src={editedEvent.imageUrl}
                            style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px', // Пример скругления углов
                            }}
                        />
                    ) : (
                        <ImageUploader onChange={handleUploadImage} style={{ width: '200px', height: '200px' }} />
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '10px' }}>
                        <Headline3>Название события:</Headline3>
                        <Editable
                            icon={<IconEdit size='s' color="inherit" />}
                            textComponent={Headline3}
                            value={editedEvent?.title || event.title}
                            onChange={(e) => {
                                setEditing(true);
                                setEditedEvent({ ...editedEvent, title: e.target.value });
                            }}
                            placeholder="Название события"
                            maxLength={50}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Headline3>Дата:</Headline3>
                        {editing ? (
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
                        ) : (
                            <Editable
                                icon={<IconEdit size='s' color="inherit" />}
                                textComponent={Headline3}
                                value={formatDateTime(event.firstDate, event.secondDate)}
                                onClick={() => setEditing(true)}
                                placeholder="Дата"
                                maxLength={50}
                            />
                        )}
                    </div>
                    <Headline3>Описание:</Headline3>
                    <TextArea
                        placeholder="Описание события"
                        value={editedEvent?.description || event.description}
                        onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                        rows={4}
                    />
                    {editing ? (
                        <div style={{ marginBottom: '10px' }}>
                            <div style={{ marginTop: '10px' }}>
                                <Button text="Сохранить" onClick={handleSaveEdit} />
                                <Button text="Отмена" onClick={handleCancelEdit} />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </Modal>
    );
};

export default MoreEventModal;