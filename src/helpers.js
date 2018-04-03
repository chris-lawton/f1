export function parseDay(date){
    return date.split('-')[2];
}

export function parseMonth(date){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const d = new Date(date);
    return monthNames[d.getMonth()];
}

export function compareDate(date) {
    const result = new Date() > new Date(date);
    return result ? 'card--finished' : '';
}