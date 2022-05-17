import React from 'react'
import { TextField } from '@material-ui/core';

export default function InputDate(props) {

    const { name, label, value, error = null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type="date"
            InputLabelProps={{
                shrink: true,
            }}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
