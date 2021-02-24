import React from "react";

import Select from "@material-ui/core/Select";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { selection } from "../utils/types";

const useStyles = makeStyles((theme) =>
  createStyles({
    dropdown: {
      width: 200,
    },
  })
);

const Selection = ({
  id,
  labelText,
  selectionValue,
  onChange,
  selectionOptions,
}: selection) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <InputLabel shrink id={id}>
          {labelText}
        </InputLabel>
        <Select
          labelId={id}
          value={selectionValue}
          className={classes.dropdown}
          onChange={onChange}
        >
          {selectionOptions}
        </Select>
      </FormControl>
    </div>
  );
};

export default Selection;
