import React from 'react';
import './Body.css';
import './Footer.css';
import './Header.css';
import DropdownGroups from './Components/DropdownGroups';
import DropdownWeeks from './Components/DropdownWeeks';

// import axios from 'axios';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            weeks: [],
            groupsIsLoaded: false,
            weeksIsLoaded: false,
            error_in_groups: null,
            error_in_weeks: null,
        };
        this.getDataFromAPI = this.getDataFromAPI.bind(this);
    }

    componentDidMount() {
        this.getDataFromAPI();
    }
    
    getDataFromAPI() {
        fetch('http://localhost:5000/groups/')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        groups: result,
                        groupsIsLoaded: true,
                    });
                },
                (error_in_groups) => {
                    this.setState({
                        groupsIsLoaded: true,
                        error_in_groups
                    });
                }
            );

        fetch('http://localhost:5000/weeks/')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        weeks: result,
                        weeksIsLoaded: true,
                    });
                },
                (error_in_weeks) => {
                    this.setState({
                        weeksIsLoaded: true,
                        error_in_weeks
                    });
                }
            );
    }

    // updateWeeksArray() {
    //     var dates_array = this.state.lessons.map((lesson) => (lesson.date_day));
    //     dates_array.sort();
    //     var first_day = dates_array[0];
    //     var last_day = dates_array[dates_array.length - 1];

    //     function getFirstDayOfTheWeek(day_array) {
    //         let day = new Date(Date.parse(day_array));
    //         var x;
    //         if (day.getDay() === 0) {x = 6;} else {x = day.getDay() - 1;};
    //         day.setDate(day.getDate() - x);
    //         let first_day_of_the_week = new Date(day);
    //         return first_day_of_the_week
    //     }

    //     var first_week_first_day = getFirstDayOfTheWeek(first_day);
    //     var last_week_first_day = getFirstDayOfTheWeek(last_day);

    //     function getAllWeeksBeginings(firstWeekFirstDay, lastWeekFirstDay) {
    //         let weeks_array = [];
    //         while (firstWeekFirstDay <= lastWeekFirstDay) {
    //         weeks_array.push(firstWeekFirstDay.toLocaleDateString());
    //         firstWeekFirstDay.setDate(firstWeekFirstDay.getDate() + 7);
    //         }
    //         return weeks_array
    //     }

    //     this.setState({weeks_array: getAllWeeksBeginings(first_week_first_day, last_week_first_day)});
    // }

    render() {
        const {groups, weeks, groupsIsLoaded, weeksIsLoaded, error_in_groups, error_in_weeks} = this.state;
        if (error_in_groups) {
            return <div>Ошибка: {error_in_groups.message} </div>;
        }
            else if (error_in_weeks) {
                return <div>Ошибка: {error_in_weeks.message} </div>;
        }
            else if (!weeksIsLoaded) {
                return <div>Загрузка weeks...</div>;
        } 
            else if (!groupsIsLoaded) {
                return <div>Загрузка groups...</div>;
          }
            else {
                return (
                    <div>
                        {/* {console.log('2019-11-04=', getFirstDayOfTheWeek('2019-11-04'))} {console.log('2019-11-14=', getFirstDayOfTheWeek('2019-11-14'))} {console.log('2019-11-24=', getFirstDayOfTheWeek('2019-11-24'))}  */}
                        {console.log('weeks in render=', weeks)} 
                        {console.log('groups in render=', groups)}
                        {/* {console.log(getAllWeeksBeginings('2019-09-23', '2019-11-04'))} */}
                        <div className="Header">
                            <div className="Hat">
                                <span role="img" aria-label="Logo">🎓</span>
                            </div>
                            <div className="Title">
                                Расписание
                    </div>
                            <div className="Today-button">
                                <button>Сегодня</button>
                            </div>
                            <div className="Arrow">
                                <button>&#60;</button>
                            </div>
                            <div className="Arrow">
                                <button>&#62;</button>
                            </div>
                            <div className="Months">
                                Октябрь 2019
                    </div>
                            {/* {
                                (this.state.groups.length > 0) && */}
                            <div className="Dropdown">
                                <DropdownGroups text="Группа" groups={this.state.groups} />
                            </div>
                            {/* } */}
                            {/* {
                                (weeks.length > 0) && */}
                            <div className="Dropdown">
                                <DropdownWeeks text="Неделя" weeks={this.state.weeks} />
                            </div>
                            {/* } */}
                            <div className="Nngu">
                                Аф ННГУ им. Н.И. Лобачевского
                    </div>
                        </div>
                        <div className="Schedule-wrapper">
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left">

                                </div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>I</big> 8:<small>00</small> - 9:<small>35</small></span>
                                </div>
                                <div className="Schedule-cell">
                                    Речевые практики (ПЗ)<br />
                                    доц. С.В. Зотова<br />
                                    (ауд.437)
                    </div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>II</big> 9:<small>45</small> - 11:<small>20</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>III</big> 12:<small>00</small> - 13:<small>35</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>IV</big> 13:<small>45</small> - 15:<small>20</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>V</big> 15:<small>30</small> - 17:<small>05</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row" id="bottom">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>VI</big> 17:<small>15</small> - 18:<small>50</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                        </div>
                        <div className="Footer">
                            <a href="https://github.com/sgbliznyuk">© 2019 Simon B <span role="img" aria-label="Smile">🧐</span></a>
                        </div>
                    </div>
        );
    }
}
}
export default App;
