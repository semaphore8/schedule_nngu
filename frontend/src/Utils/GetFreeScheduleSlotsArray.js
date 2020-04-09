// Try edit message
export default function getFreeScheduleSlotsArray(days, lessons, selectedWeekParity, speakerClassesDistance, speakerClassesFulltime, speakerBlockedSlotsDistance, speakerBlockedSlotsFulltime) {
  for (let day of days) {
    
    // add classes to an array

    day.classes_count = '';
    day.classes=[]
    for (let i of [1,2,3,4,5,6]) {
      day.classes.push(
  			{
  				'number': `${i}`,
  				'lesson': false,
  				'speaker_is_free': true,
  				'classroom_is_free': true,
  				'class_in_streak': false,
  			}
      );
    }

    // handle "lesson" and "class_in_streak" properties

      for (let l of lessons) {
        for (let c in day.classes) {
          if (l.date_day === day.date && l.class_number === day.classes[c].number) 
          {
            day.classes[c].lesson = true;
            try {day.classes[parseInt(c)+1].class_in_streak = true} catch(e) {};
            try {day.classes[parseInt(c)-1].class_in_streak = true} catch(e) {};
          }
        }
      }


    // handle "classes_count"

      var i = 0;
      for (let c of day.classes) {
        c.lesson === true && i++;
      }
      day.classes_count = i;
      i = 0;

    // handle "speaker_is_free" 

      /*check speaker's distance classes*/
  for (let c of speakerClassesDistance) {
    if (c.date_day === day.date) {
      for (let cl of day.classes) {
        if (c.class_number === cl.number) cl.speaker_is_free = false
      }
    }
  }
      /*check speaker's fulltime classes*/
  for (let c of speakerClassesFulltime) {
    if (c.day === day.wday_en && c.week_parity === selectedWeekParity) {
      for (let cl of day.classes) {
        if (c.class_number === cl.number) cl.speaker_is_free = false
      }
    }
  }
      /*check speaker's blocked class spots*/
  
  for (let s of speakerBlockedSlotsDistance) {
    if (s.date_day === day.date) {
      for (let cl of day.classes) {
        if (s.class_number.toString() === cl.number) cl.speaker_is_free = false
      }
    }
  }

  for (let s of speakerBlockedSlotsFulltime) {
    if (s.day === day.wday_en && s.week_parity === selectedWeekParity) {
      for (let cl of day.classes) {
        if (s.class_number.toString() === cl.number) cl.speaker_is_free = false
      }
    }
  }

  }
  return days
}

// const days = [
//   {
//     "wday": "пн",
//     "wday_en": "Mon",
//     "day": 8,
//     "date": "2020-06-08"
//   },
//   {
//     "wday": "вт",
//     "wday_en": "Tue",
//     "day": 9,
//     "date": "2020-06-09"
//   },
//   {
//     "wday": "ср",
//     "wday_en": "Wed",
//     "day": 10,
//     "date": "2020-06-10"
//   },
//   {
//     "wday": "чт",
//     "wday_en": "Thu",
//     "day": 11,
//     "date": "2020-06-11"
//   },
//   {
//     "wday": "пт",
//     "wday_en": "Fri",
//     "day": 12,
//     "date": "2020-06-12"
//   },
//   {
//     "wday": "сб",
//     "wday_en": "Sat",
//     "day": 13,
//     "date": "2020-06-13"
//   }
// ]

// const lessons = [
//   {
//     "id": 2,
//     "__str__": "Концепции современного естествознания - Лабораторная работа Е.М. Галямова Л-987",
//     "date_day": "2020-06-11",
//     "class_number": "2",
//     "study_group": "IT-58",
//     "subject": {
//       "id": 20,
//       "name": "Концепции современного естествознания",
//       "s_type": "Лабораторная работа"
//     },
//     "speaker": "Е.М. Галямова",
//     "classroom": "Л-987",
//     "term": 2
//   },
//   {
//     "id": 4,
//     "__str__": "Европейские языки и культура - Лабораторная работа Трухманов Владимир Борисович Б-607",
//     "date_day": "2020-06-13",
//     "class_number": "4",
//     "study_group": "IT-58",
//     "subject": {
//       "id": 17,
//       "name": "Европейские языки и культура",
//       "s_type": "Лабораторная работа"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Б-607",
//     "term": 2
//   },
//   {
//     "id": 7,
//     "__str__": "Физическая культура и спорт (ПЗ) - Практика К. Ю. Машков A-303",
//     "date_day": "2020-06-17",
//     "class_number": "3",
//     "study_group": "IT-58",
//     "subject": {
//       "id": 2,
//       "name": "Физическая культура и спорт (ПЗ)",
//       "s_type": "Практика"
//     },
//     "speaker": "К. Ю. Машков",
//     "classroom": "A-303",
//     "term": 2
//   },
//   {
//     "id": 10,
//     "__str__": "Изобразительное искусство - Лабораторная работа Вострокнутов Игорь Евгеньевич Л-987",
//     "date_day": "2020-06-17",
//     "class_number": "2",
//     "study_group": "IT-58",
//     "subject": {
//       "id": 5,
//       "name": "Изобразительное искусство",
//       "s_type": "Лабораторная работа"
//     },
//     "speaker": "Вострокнутов Игорь Евгеньевич",
//     "classroom": "Л-987",
//     "term": 2
//   },
//   {
//     "id": 1,
//     "__str__": "Концепции современного естествознания - Лабораторная работа Вострокнутов Игорь Евгеньевич Ф-404",
//     "date_day": "2020-06-20",
//     "class_number": "1",
//     "study_group": "IT-58",
//     "subject": {
//       "id": 20,
//       "name": "Концепции современного естествознания",
//       "s_type": "Лабораторная работа"
//     },
//     "speaker": "Вострокнутов Игорь Евгеньевич",
//     "classroom": "Ф-404",
//     "term": 2
//   }
// ]

// const selectedWeekParity = "even"

// const speakerClassesDistance = [
//   {
//     "id": 13,
//     "__str__": "Концепции современного естествознания - Лекция Трухманов Владимир Борисович Ф-404",
//     "date_day": "2020-06-12",
//     "class_number": "5",
//     "study_group": "КАИ-85",
//     "subject": {
//       "id": 22,
//       "name": "Концепции современного естествознания",
//       "s_type": "Лекция"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Ф-404",
//     "term": 2
//   },
//   {
//     "id": 4,
//     "__str__": "Европейские языки и культура - Лабораторная работа Трухманов Владимир Борисович Б-607",
//     "date_day": "2020-06-13",
//     "class_number": "4",
//     "study_group": "IT-58",
//     "subject": {
//       "id": 17,
//       "name": "Европейские языки и культура",
//       "s_type": "Лабораторная работа"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Б-607",
//     "term": 2
//   },
//   {
//     "id": 14,
//     "__str__": "Медицинская биология и общая генетика - Практика Трухманов Владимир Борисович Ф-404",
//     "date_day": "2020-06-13",
//     "class_number": "6",
//     "study_group": "РП-98",
//     "subject": {
//       "id": 27,
//       "name": "Медицинская биология и общая генетика",
//       "s_type": "Практика"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Ф-404",
//     "term": 2
//   }
// ]

// const speakerClassesFulltime = [
//   {
//     "id": 8,
//     "__str__": "Управление газонами - Практика Трухманов Владимир Борисович Б-607",
//     "week_parity": "even",
//     "day": "Mon",
//     "class_number": "2",
//     "study_group": "ФВБпД-1222",
//     "subject": {
//       "id": 24,
//       "name": "Управление газонами",
//       "s_type": "Практика"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Б-607",
//     "term": 2
//   },
//   {
//     "id": 5,
//     "__str__": "Концепции современного естествознания - Лабораторная работа Трухманов Владимир Борисович Л-987",
//     "week_parity": "uneven",
//     "day": "Thu",
//     "class_number": "4",
//     "study_group": "КЕ-111",
//     "subject": {
//       "id": 20,
//       "name": "Концепции современного естествознания",
//       "s_type": "Лабораторная работа"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Л-987",
//     "term": 2
//   },
//   {
//     "id": 7,
//     "__str__": "Научное птицеводство - Практика Трухманов Владимир Борисович Б-607",
//     "week_parity": "even",
//     "day": "Tue",
//     "class_number": "5",
//     "study_group": "БOН34-НОБ1",
//     "subject": {
//       "id": 23,
//       "name": "Научное птицеводство",
//       "s_type": "Практика"
//     },
//     "speaker": "Трухманов Владимир Борисович",
//     "classroom": "Б-607",
//     "term": 2
//   }
// ]

// const speakerBlockedSlotsDistance = [
//   {
//     "speaker_info": {
//       "id": 10,
//       "name": "Трухманов Владимир Борисович"
//     },
//     "date_day": "2020-06-12",
//     "class_number": 2
//   },
//   {
//     "speaker_info": {
//       "id": 10,
//       "name": "Трухманов Владимир Борисович"
//     },
//     "date_day": "2020-06-12",
//     "class_number": 3
//   }
// ]

// const speakerBlockedSlotsFulltime = [
//   {
//     "speaker_info": {
//       "id": 10,
//       "name": "Трухманов Владимир Борисович"
//     },
//     "week_parity": "even",
//     "class_number": 2,
//     "day": "Sat"
//   },
//   {
//     "speaker_info": {
//       "id": 10,
//       "name": "Трухманов Владимир Борисович"
//     },
//     "week_parity": "even",
//     "class_number": 3,
//     "day": "Sat"
//   }
// ]

