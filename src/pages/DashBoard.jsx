import {Button} from "@salutejs/plasma-web";
import Header from "../components/Header.jsx";
import Events from "./Events.jsx";

export default () => {
    const accessToken = localStorage.getItem('accessToken');
    const tab = localStorage.getItem('tab');
    if(!accessToken) window.location.href = "/";
    return (
        <div>
            <Header/>
            {tab === '0' ? <Events/> : null}
        </div>
    );
};