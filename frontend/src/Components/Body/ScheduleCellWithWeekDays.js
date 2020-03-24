import React from 'react';

export default function ScheduleCellWithWeekDays(props) {
    let date = new Date();
    return( 
            <div 
            className={["Schedule-cell", props.day.date === date.toISOString().slice(0,10) ? "Schedule-cell-weekday-today" : "Schedule-cell-weekday"].join(' ')} 
            key={props.day.day}
            >
            <div className="wday">
                <div>
                {props.day.wday}
                </div>
            </div>
            <div className="day">
                <div>
                {props.day.day}
                </div>
            </div>
            </div>
    )
    

}