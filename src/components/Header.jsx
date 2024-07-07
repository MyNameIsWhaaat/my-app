import React, { useState, useEffect } from "react";
import { Toolbar, Avatar, Cell, CellTextbox, CellTextboxTitle, CellTextboxSubtitle, IconButton, Tabs, TabItem } from "@salutejs/plasma-web";
import { IconLogout } from '@salutejs/plasma-icons';
import sber from '../assets/sber_ru_green.png';

export default () => {
    const { firstname, lastname, email, isAdmin } = JSON.parse(localStorage.getItem('userInfo'));
    const items = ['События', 'Мои билеты', 'Магазин', 'Сообщество'];
    const [index, setIndex] = useState(0);
    useEffect(() => {
        localStorage.setItem('tab', '0');
    });
    
    const activeTabStyle = {
        backgroundColor: '#f1f5f7'
    };

    return (
        <>
            <div className="GradientBar">
                <div className="GradientBar-inner"></div>
            </div>
            <Toolbar orientation="horizontal" style={{ width: '100%', padding: '0 1rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <img src={sber} alt="Логотип СберБанка" height={20}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    <Tabs view="clear" stretch size="s" style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>
                        {items.map((item, i) => (
                            <TabItem
                                view={i === index ? "primary" : "secondary"}
                                key={`item:${i}`}
                                size="s"
                                selected={i === index}
                                tabIndex={0}
                                onClick={() => {
                                    setIndex(i);
                                    localStorage.setItem('tab', i);
                                    window.location.reload();
                                }}
                                style={i === index ? activeTabStyle : { margin: '0 8px' }}
                            >
                                {item}
                            </TabItem>
                        ))}
                    </Tabs>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Cell
                        contentLeft={<Avatar name={`${firstname} ${lastname}`} size='m'/>}
                        contentRight={<IconButton view="clear" onClick={() => {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('userInfo');
                            window.location.href = "/";
                        }}><IconLogout size="s" color="red"/></IconButton>}
                        size="m"
                    >
                        <CellTextbox style={{ flex: 1 }}>
                            <CellTextboxTitle>{firstname} {lastname}</CellTextboxTitle>
                            <CellTextboxSubtitle>{email}{isAdmin ? ' (админ)' : ''}</CellTextboxSubtitle>
                        </CellTextbox>
                    </Cell>
                </div>
            </Toolbar>
        </>
    );
}