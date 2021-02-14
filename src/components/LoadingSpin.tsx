import React from "react";
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
            position: 'absolute',
            minHeight:'100%',
            minWidth:'100%',
            zIndex:999,
        },
    }),
);

const LoadingSpin = () =>{

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size='8rem' />
        </div>
    );
};

export default LoadingSpin;