import React, { useState } from "react";
import "./Header.css";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  logo: {
    marginRight: theme.spacing(3),
  },
  naviMenuLink: {
    cursor: "pointer",
  },
}));

export function Header() {
  const [auth, setAuth] = useState(true);

  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            Ad Manager
          </Typography>
          <Typography className={classes.root}>
            {auth && (
              <>
                <Link
                  onClick={() => history.push("/users/list")}
                  color="inherit"
                  className={classes.naviMenuLink}
                >
                  ユーザー管理
                </Link>
                <Link
                  onClick={() => history.push("/agencies/list")}
                  color="inherit"
                  className={classes.naviMenuLink}
                >
                  代理店管理
                </Link>
                <Link
                  onClick={() => history.push("/advertisers/list")}
                  color="inherit"
                  className={classes.naviMenuLink}
                >
                  広告主管理
                </Link>
                <Link
                  onClick={() => history.push("/campaigns/list")}
                  color="inherit"
                  className={classes.naviMenuLink}
                >
                  キャンペーン管理
                </Link>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
