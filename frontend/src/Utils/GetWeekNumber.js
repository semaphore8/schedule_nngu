// returns current week number

const getWeekNumber = (date) => {
    let onejan = new Date(date.getFullYear(), 0, 1);
    let week = Math.ceil( (((date - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
    return week
};

export default getWeekNumber