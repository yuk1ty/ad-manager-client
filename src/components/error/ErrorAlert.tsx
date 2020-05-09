import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

interface ErrorAlertProps {
  errors: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorAlert: {
      margin: theme.spacing(3, 0),
    },
  })
);

export function ErrorAlert(props: ErrorAlertProps) {
  const classes = useStyles();

  if (props.errors.length !== 0) {
    return (
      <Alert severity="error" className={classes.errorAlert}>
        {props.errors.map((err) => `${err}\n`)}
      </Alert>
    );
  } else {
    return <></>;
  }
}
