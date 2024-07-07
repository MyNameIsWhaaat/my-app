<<<<<<< HEAD
import {Button, Toolbar} from "@salutejs/plasma-web";
=======
import {Button} from "@salutejs/plasma-web";
import Header from "../components/Header.jsx";
import Events from "./Events.jsx";
>>>>>>> 785eed6c1086ae6ce013f3cb311f96d1747017b7

export default () => {
    const accessToken = localStorage.getItem('accessToken');
    const tab = localStorage.getItem('tab');
    if(!accessToken) window.location.href = "/";
    return (
<<<<<<< HEAD
         <div></div>
=======
        <div>
            <Header/>
            {tab === '0' ? <Events/> : null}
        </div>
>>>>>>> 785eed6c1086ae6ce013f3cb311f96d1747017b7
    );
};