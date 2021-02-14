// @ts-nocheck

import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>

    createStyles({
        datepicker: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(0),
            width: 150,
        }
    }));

const DatePicker = (props) => {

    const classes = useStyles();

    return (
        <div>
            <form>
            <TextField
                id={props.id}
                type="date"
                defaultValue= {props.dateValue}
                label={props.label}
                className={classes.datepicker}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={props.onChange}
            />
            </form>
        </div>
    )
}

// const mapStateToProps = (state: any) => ({
//     currency: state.currency,
//     loading: state.loading
// })
//
// const mapDispatchToProps = (dispatch: any) => ({
//     getCurrencyFullName: () => dispatch({type: GET_CURRENCIES_IN_FULL_NAME})
//
// })
// export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
export default DatePicker;