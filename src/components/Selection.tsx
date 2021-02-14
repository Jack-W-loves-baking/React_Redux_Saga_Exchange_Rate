// @ts-nocheck
import React from 'react';

import Select from '@material-ui/core/Select';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles((theme) =>
    createStyles({
        dropdown: {
            width: 200
        },
    }));

const Selection = (props) => {

    const classes = useStyles();

    return (
        <div>
            <FormControl>
                <InputLabel shrink id={props.id}>
                    {props.labelText}
                </InputLabel>
                <Select
                    labelId={props.id}
                    label={props.labelText}
                    value={props.selectionValue}
                    className={classes.dropdown}
                    onChange={props.onChange}
                >
                    {props.selectionOptions}
                </Select>
            </FormControl>
        </div>
    )
}

export default Selection;