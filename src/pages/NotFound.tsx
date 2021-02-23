import React from "react";
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        item: {
            marginTop: '10vh'
        }
    }));

const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <h1>
                404 Page Not Found :(
            </h1>
            {/*click to root page*/}
            <Link to="/">
                Go Home
            </Link>
        </div>
    )
}
export default NotFound;