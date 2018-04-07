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

export function isDateBeforeToday(date) {
    return new Date(date.toString()) < new Date(new Date().toString());
}

export function daysUntilLightsOut(date) {
    const raceDate = new Date(date);
    const today = new Date();

    // calculate milli-seconds per day
    const msPerDay = 1000 * 60 * 60 * 24;

    // discard the time and time-zone information
    const utc1 = Date.UTC(raceDate.getFullYear(), raceDate.getMonth(), raceDate.getDate());
    const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    // work out the difference
    const difference = Math.floor((utc2 - utc1) / msPerDay);

    // return a positive number
    return Math.abs(difference);
}
