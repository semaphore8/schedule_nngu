import React from 'react';

export default function ScheduleCellWithContent(props) {
    let lesson = props.lessons.find(lesson => lesson.date_day === props.day.date && lesson.class_number === props.class_number && lesson.study_group === props.selected_group)
    return(
            <div className="Schedule-cell" key={props.class_number + props.day.day}>
                {
                    lesson && 
                    <div className="Schedule-cell-content">
                        <div className="Lesson-subject">
                            {lesson['subject']['name']}  
                        </div>
                        <div className="Lesson-speaker">
                            {lesson['speaker']} 
                        </div>
                        <div className="Lesson-classroom">
                        {lesson['subject']['s_type']} {lesson['classroom']}
                        </div>
                    </div>
                    
                }
            </div>
    )
}