let calendar = undefined;

export const getCalendar = () => {
    return calendar.value
}

export const setCalendar = (cal) => {
    if(calendar) {
        return;
    }
    calendar = cal
}