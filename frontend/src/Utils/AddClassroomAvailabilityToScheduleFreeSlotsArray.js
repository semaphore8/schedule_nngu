export default function addClassroomAvailabilityToScheduleFreeSlotsArray (selectedClassroom, scheduleFreeSlotsArray, lessons, selectedWeekParity) {
    var res = scheduleFreeSlotsArray.map(d => d)    
    for (let day of res) {
        for (let l of lessons) {
            if (l.week_parity === selectedWeekParity && l.day === day.wday_en && l.classroom === selectedClassroom) {
                        day.classes[parseInt(l.class_number)-1].classroom_is_free = false
                }
            }
        }
        return res
    }