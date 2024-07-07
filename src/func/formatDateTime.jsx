export default (firstDate, secondDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);

    const hours1 = ('0' + date1.getHours()).slice(-2);
    const minutes1 = ('0' + date1.getMinutes()).slice(-2);
    const day1 = ('0' + date1.getDate()).slice(-2);
    const month1 = ('0' + (date1.getMonth() + 1)).slice(-2);
    const year1 = date1.getFullYear();

    const hours2 = ('0' + date2.getHours()).slice(-2);
    const minutes2 = ('0' + date2.getMinutes()).slice(-2);
    const day2 = ('0' + date2.getDate()).slice(-2);
    const month2 = ('0' + (date2.getMonth() + 1)).slice(-2);
    const year2 = date2.getFullYear();

    if(!secondDate) return `${hours1}:${minutes1} ${day1}.${month1}.${year1}`;
    else if (date1.toDateString() === date2.toDateString()) {
        return `${hours1}:${minutes1}-${hours2}:${minutes2} ${day1}.${month1}.${year1}`;
    } else {
        return `${day1}.${month1}.${year1}-${day2}.${month2}.${year2}`;
    }
};