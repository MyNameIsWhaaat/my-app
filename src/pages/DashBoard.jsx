import {Button} from "@salutejs/plasma-web";

export default () => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) window.location.href = "/";
    return (
        123
    );
};