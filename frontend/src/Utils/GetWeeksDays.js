// for selected (or current if no selected) week returns an array with day's numbers, weekdays and dates
// 0: {wday: "пн", wday_en: "Mon", day: 23, date: "2020-03-23"}
// 1: {wday: "вт", wday_en: "Tue", day: 24, date: "2020-03-24"}
// 2: {wday: "ср", wday_en: "Wed", day: 25, date: "2020-03-25"}
// 3: {wday: "чт", wday_en: "Thu", day: 26, date: "2020-03-26"}
// 4: {wday: "пт", wday_en: "Fri", day: 27, date: "2020-03-27"}
// 5: {wday: "сб", wday_en: "Sat", day: 28, date: "2020-03-28"}



export default function getWeeksDays(selected_week, study_mode) {
    var days = [];
    var d;
    // var wd; // week day
    if (selected_week !== '' && study_mode === 'distance') {
        d = new Date(Date.parse(selected_week));
        // wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
        days.push({
            wday: d.toLocaleDateString('RU-ru', { weekday: 'short' }),
            wday_en: d.toLocaleDateString('en-US', { weekday: 'short' }),
            day: d.getDate(),
            date: d.toISOString().slice(0,10),
        });
        for (let i=0; i<5; i++) {
            d.setDate(d.getDate()+1)
            // wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
            days.push({
                wday: d.toLocaleDateString('RU-ru', { weekday: 'short' }),
                wday_en: d.toLocaleDateString('en-US', { weekday: 'short' }),
                day: d.getDate(),
                date: d.toISOString().slice(0,10),
            });
        };
    }
    else {
        d = new Date();
        if (d.getDay() !== 0) 
        d.setDate(d.getDate()-(d.getDay()-1))
        else
        d.setDate(d.getDate()-6);
        // wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
        days.push({
            wday: d.toLocaleDateString('RU-ru', { weekday: 'short' }),
            wday_en: d.toLocaleDateString('en-US', { weekday: 'short' }),
            day: d.getDate(),
            date: d.toISOString().slice(0,10),
        });
        for (let i=0; i<5; i++) {
            d.setDate(d.getDate()+1);
            // wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
            days.push({
                wday: d.toLocaleDateString('RU-ru', { weekday: 'short' }),
                wday_en: d.toLocaleDateString('en-US', { weekday: 'short' }),
                day: d.getDate(),
                date: d.toISOString().slice(0,10),
            });
        };
    }
    return days
}