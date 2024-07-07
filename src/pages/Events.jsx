import React, { useState, useEffect } from 'react';
import {
    Calendar,
    Cell,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    addNotification,
} from '@salutejs/plasma-web';
import getEvents from '../API/getEvents';
import styled from 'styled-components';
import formatDateTime from '../func/formatDateTime.jsx';
import MoreEventModal from '../components/MoreEventModal.jsx';
import createTicket from '../API/createTicket';
import deleteTicket from '../API/deleteTicket';

const StyledButton = styled(Button)`
    background-color: #ffffff;
    color: #000000;
    &:hover {
        background-color: #f0f0f0;
        color: #000000;
    }
`;

const Events = () => {
    const [events, setEvents] = useState([]);
    const [value, setValue] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [loadingReg, setLoadingReg] = useState(false);
    const [loadingUnreg, setLoadingUnreg] = useState(false);
    const isAdmin = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).isAdmin : false;

    useEffect(() => {
        let isMounted = true;
        const fetchEvents = async () => {
            const response = await getEvents();
            if (response && isMounted) setEvents(response.data);
        };
        fetchEvents();
        return () => {
            isMounted = false;
        };
    }, []);

    const truncateDescription = (description, length) => {
        if (description.length > length) {
            return description.substring(0, length) + '...';
        }
        return description;
    };

    const handleOnChange = (newValue) => {
        setValue(newValue);
    };

    const handleRegister = async (id) => {
        setLoadingReg(true);
        const res = await createTicket(id);
        if (res?.code === 200) {
            setEvents(prevEvents => (
                prevEvents.map(event =>
                    event.id === id ? { ...event, registered: true } : event
                )
            ));
            setLoadingReg(false);
        } else {
            addNotification({
                title: res.message,
                children: "Код ошибки: " + res.code,
                showCloseIcon: false
            }, 2000);
        }
    };
    
    const handleUnregister = async (id) => {
        setLoadingReg(true);
        const res = await deleteTicket(id);
        if (res?.code === 200) {
            setEvents(prevEvents => (
                prevEvents.map(event =>
                    event.id === id ? { ...event, registered: false } : event
                )
            ));
            setLoadingReg(false);
        } else {
            addNotification({
                title: res.message,
                children: "Код ошибки: " + res.code,
                showCloseIcon: false
            }, 2000);
        }
    };    

    const openModal = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setModalOpen(false);
        setEditedEvent(null);
    };

    const handleEdit = () => {
        setEditedEvent(selectedEvent); // сохраняем выбранное событие в editedEvent для редактирования
    };

    const handleSaveEdit = (updatedEvent) => {
        // Здесь можно добавить логику сохранения изменений
        console.log('Сохранение изменений', updatedEvent);
        // Обновляем events с новым измененным событием
        setEvents(events.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
        ));
        setEditedEvent(null); // очищаем editedEvent после сохранения
        setSelectedEvent(updatedEvent); // обновляем selectedEvent
    };

    const handleCancelEdit = () => {
        setEditedEvent(null);
    };

    const handleDeleteImage = () => {
        // Здесь можно добавить логику удаления изображения
        console.log('Удаление изображения', editedEvent);
        setEditedEvent({ ...editedEvent, imageUrl: null });
    };

    const handleUploadImage = (file) => {
        // Здесь можно добавить логику загрузки нового изображения
        console.log('Загрузка изображения', file);
        // Пример: сохранение ссылки на изображение в editedEvent
        const imageUrl = URL.createObjectURL(file);
        setEditedEvent({ ...editedEvent, imageUrl });
    };

    const cardStyle = {
        background: 'linear-gradient(135deg, rgba(0,179,179,0.8), rgba(0,255,0,0.8))',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom:'30px',
    };

    const cardStyle2 = {
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(216,216,216,1) 35%, rgba(171,171,171,1) 100%);',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
    };

    const cardStyle3 = { 
        border:'3px solid rgba(0,255,0,0.8)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom:'10px',
    };

    const modalContentStyle = {
        width: '100%', // Расширяем контент модального окна на всю доступную ширину
        maxWidth: '800px', // Максимальная ширина контента модального окна
    };

    const addEvent = () => {
        // Здесь можно добавить логику для создания нового события
        console.log('Добавление нового события');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexDirection:"column"}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Card style={cardStyle}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <Calendar
                            isDouble
                            value={value}
                            eventList={events.map((event) => ({
                                date: new Date(event.firstDate),
                                color: event.registered
                                    ? new Date(event.firstDate) < new Date()
                                        ? 'green'
                                        : 'purple'
                                    : new Date(event.firstDate) < new Date()
                                    ? 'gray'
                                    : 'blue',
                            }))}
                            onChangeValue={handleOnChange}
                        />
                    </div>
                </CardContent>
            </Card>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
                {events?.filter((event) => new Date(event.firstDate).toDateString() === value.toDateString())?.length>0 && <Card style={cardStyle2}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <h2>
                            События {('0' + value.getDate()).slice(-2)}.{('0' + (value.getMonth() + 1)).slice(-2)}.
                            {value.getFullYear()}
                        </h2>
                        {isAdmin && <StyledButton text="Добавить событие" size="s" onClick={addEvent} />}
                    </div>
                
                    {events
                        .filter((event) => new Date(event.firstDate).toDateString() === value.toDateString())
                        .map((event, i) => (
                            <Card style={cardStyle3}>
                            <Cell
                                key={i}
                                size="l"
                                contentRight={
                                    <ButtonGroup size="xs" shape="segmented">
                                        {event.registered ? (
                                            <StyledButton
                                                text="Отказаться"
                                                loading={loadingReg}
                                                onClick={() => handleUnregister(event.id)}
                                            />
                                        ) : (
                                            <StyledButton text="Регистрация" loading={loadingReg} onClick={() => handleRegister(event.id)} />
                                        )}
                                        <StyledButton text="Подробнее" onClick={() => openModal(event)}/>
                                    </ButtonGroup>
                                }
                                title={`${event.title}`}
                                subtitle={`${formatDateTime(event.firstDate, event.secondDate)} | ${truncateDescription(event.description,45)}`}
                                style={{ marginBottom: '30px' }}
                            />
                            </Card>
                        ))}
                </Card>}
            </div>

            {selectedEvent && (
                <MoreEventModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    event={selectedEvent}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onSaveEdi={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                    onDeleteImage={handleDeleteImage}
                    onUploadImage={handleUploadImage}
                    editedEvent={editedEvent}
                />
            )}
        </div>
    );
};

export default Events;
