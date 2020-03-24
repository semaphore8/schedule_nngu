import React from 'react';
import ScheduleCellWithContent from './ScheduleCellWithContent'

export default function ScheduleRowWithContent(props) {
    return (
        <div className="Schedule-row" id={props.row_number}>
        <div className="Schedule-cell" id="left"><span>
            <big>{props.t.roman}</big> {props.t.begin} - {props.t.end}</span>
        </div>
        {
            props.days.map(day => 
                <ScheduleCellWithContent 
                    key={props.row_number + day.day}
                    class_number={props.row_number}
                    lessons={props.lessons_distance}
                    day={day}
                    selected_group={props.selected_group}
                />
        )    
        }
        </div>
    )
}