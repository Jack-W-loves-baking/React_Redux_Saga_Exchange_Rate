import React from 'react';

import {headerText} from "../utils/types";

const HeaderText = (props:headerText) => {
    return (
        <h1 >
            {props.headerText}
        </h1>
    )
}
export default HeaderText;
