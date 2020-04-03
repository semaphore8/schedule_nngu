import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonsGroup from './Components/RadioButtonsGroup'
import ComboBox from './Components/ComboBox'
import SimpleTable from './Components/SimpleTable'
import Select from './Components/Select'
import { ApiURI } from '../AppConfig';


export default function Admin() {
    
    // Constants

    const loadTitles = [
        'Предмет', 
        'Количество часов', 
        'Часов в расписании', 
        'Часов в неделю', 
        'Пар в неделю'
    ]

    // Components styles

    const loadTableStyles = makeStyles({
        table: {
            maxWidth: 950,
        },
        root: {
            maxWidth: 950,
        },
    });

    const selectStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    // State hooks
    
    const [selectedGroup, setSelectedGroup] = React.useState('');
    const [groupChoices, setGroupChoices] = React.useState([]);
    
    const [selectedTerm, setSelectedTerm] = React.useState('');
    const [termChoices, setTermChoices] = React.useState([]);
    
    const [loads, setLoads] = React.useState([]);

    const [lessons, setLessons] = React.useState([]);

    const [selectedWeek, setSelectedWeek] = React.useState('');

    // handle components changes

    const handleChangeTerm = (event) => {
        setSelectedTerm(termChoices.filter(term => term.number === event.target.value)[0]);
        setSelectedWeek('');
    };

    const handleChangeGroup = (event, value) => {
        value ? setSelectedGroup(value) : setSelectedGroup('');
        setSelectedWeek('');
    }

    const handleChangeWeek = (event) => {
        setSelectedWeek(event.target.value);
    };

    // data fetching

    const [groupsLoading, setGroupsLoading] = React.useState(false);
    const [termsLoading, setTermsLoading] = React.useState(false);
    const [groupsError, setGroupsError] = React.useState(false);
    const [termsError, setTermsError] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setGroupsLoading(true);            
            const result_groups = await fetch(ApiURI + '/groups/')
            .then(response => response.json());
            setGroupChoices(result_groups);
            setGroupsLoading(false);
        };
        fetchData();
    },[])

    useEffect(() => {
        const fetchData = async () => {
            setTermsLoading(true); 
            const result_terms = await fetch(ApiURI + '/terms/')
            .then(response => response.json());
            setTermChoices(result_terms);
            setTermsLoading(false); 
        };
        fetchData();
    },[])
  
    useEffect(() => {
        if (selectedTerm && selectedGroup) {
            const fetchData = async () => {
                const result = await fetch(ApiURI + '/loads/')
                .then(response => response.json())
                .then(result => {
                    setLoads(
                        result.filter(load => load.group === selectedGroup.id && load.term === selectedTerm.id)
                    )
                });
            };
            fetchData();
        };

        if (selectedGroup.mode_of_study === 'distance') {
            const fetchData = async () => {
                const result = await fetch(ApiURI + '/lessons_distance/')
                .then(response => response.json())
                .then(result => {
                    setLessons(
                        result.filter(lesson => lesson.term === selectedTerm.number)
                    )
                });
                };
                fetchData();
            };
            
        if (selectedGroup.mode_of_study === 'fulltime') {
            const fetchData = async () => {
                const result = await fetch(ApiURI + '/lessons_fulltime/')
                .then(response => response.json())
                .then(result => {
                    setLessons(
                        result.filter(lesson => lesson.term === selectedTerm.number)
                    )
                });
                };
                fetchData();
            };

    },[selectedGroup, selectedTerm])

    return (
        <div>
            <h2>
            Admin interface
            </h2>
            {
                groupsLoading ? (<div><i>Groups is loading...</i></div>) : (
                    <ComboBox 
                        label="Группа"
                        options={groupChoices}
                        clearText="Очистить"
                        noOptionsText="Группа не найдена"
                        autoHighlight={true}
                        handleChange={handleChangeGroup}
                    />
                )
            }
            <br />
            {
                termsLoading ? (<div><i>Terms is loading...</i></div>) : (
                    <RadioButtonsGroup 
                        label="Семестр"
                        handleChange={handleChangeTerm}
                        choices={termChoices}
                    />
                )
            }
            <br />
            <SimpleTable
                titles={loadTitles}
                useStyles={loadTableStyles}
                lessons={lessons}
                loads={loads}
                selectedTerm={selectedTerm}
                study_mode={selectedGroup.mode_of_study}
             />
            <br />
            {
                (selectedGroup && selectedTerm) &&
                <div>
                    <Select
                    useStyles={selectStyles}
                    handleChange={handleChangeWeek}
                    value={selectedWeek}
                    label="Неделя"
                    values={selectedGroup.mode_of_study === 'distance' ? selectedTerm.weeks : ['Чётная', 'Нечётная']}
                    />
                    <span>{selectedWeek}</span>
                </div>
            }
        </div>
    )
}




