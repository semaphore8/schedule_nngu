import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
    return (
        <Autocomplete
        autoHighlight={props.autoHighlight}
        onChange={props.handleChange}
        clearText={props.clearText}
        noOptionsText={props.noOptionsText}
        id={props.label}
        options={props.options}
        getOptionLabel={props.getOptionLabel}
        disableClearable={true}
        style={props.style}
        renderInput={params => <TextField {...params} label={props.label} variant="outlined" />}
        />
    );
}