import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches(props) {
  const [state, setState] = React.useState({
    checkedB: true,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.getStudyModeFromSwitch(event.target.checked);
  };

  return (
    <div className='SwitchWrapper'>
    <span className='SwitchLabel'>Дневное <span role="img" aria-label="Univercity">🏛️</span></span>
      <Switch
        checked={state.checkedB}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <span className='SwitchLabel'><span role="img" aria-label="Bus">🚌</span> Заочное</span>
    </div>
  );
}
