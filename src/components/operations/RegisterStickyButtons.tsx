import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Tooltip,
  Fab,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fixed: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  })
);

interface RegisterStickyProps {
  onClick: () => void;
}

export function RegisterStickyButtons(props: RegisterStickyProps) {
  const classes = useStyles();
  return (
    <>
      <Tooltip title="新規作成" aria-label="add">
        <Fab color="primary" className={classes.fixed} onClick={props.onClick}>
          <Add />
        </Fab>
      </Tooltip>
    </>
  );
}
