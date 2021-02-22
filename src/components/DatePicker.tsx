import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { datePicker } from "../utils/types";

const useStyles = makeStyles((theme) =>
    createStyles({
        datepicker: {
            marginLeft: theme.spacing(5),
            width: 150,
        }
    }));

const DatePicker = ({ id, dateValue, label, onChange } : datePicker) => {
    const classes = useStyles();

    return (
        <div>
            <form>
            <TextField
                id={id}
                type="date"
                defaultValue= {dateValue}
                label={label}
                className={classes.datepicker}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={onChange}
            />
            </form>
        </div>
    )
}

export default DatePicker;