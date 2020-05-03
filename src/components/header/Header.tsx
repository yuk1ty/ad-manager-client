import React, { useState } from "react";
import "./Header.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export function Header() {
  const [auth, setAuth] = useState(true);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Ad Manager</Typography>
          {auth && (
            <>
              <Link to="/users/list">ユーザー管理</Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
