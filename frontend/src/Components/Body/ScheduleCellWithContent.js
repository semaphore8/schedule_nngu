import React from 'react';

export default function ScheduleCellWithContent(props) {
    if (props.study_mode === 'distance') {
        var lesson = props.lessons.find(lesson => lesson.date_day === props.day.date && lesson.class_number === props.class_number && lesson.study_group === props.selected_group)
    } else if (props.study_mode === 'fulltime') {
        var lesson = props.lessons.find(lesson => lesson.week_parity === props.selected_week_fulltime && lesson.day === props.day.wday_en && lesson.class_number === props.class_number && lesson.study_group === props.selected_group_fulltime)
    }
    return(
            <div className="Schedule-cell" key={props.class_number + props.day.wday}>
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