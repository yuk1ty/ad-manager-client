import React from "react";
import "./Header.css";
import { Menu } from "element-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <Menu theme="dark" defaultActive="1" mode="horizontal">
        <Menu.Item index="1">
          <Link to="/">Ad Manager</Link>
        </Menu.Item>
        <Menu.SubMenu index="2" title="ユーザー管理">
          <Menu.Item index="2-1">
            <Link to="/users/list">ユーザー管理</Link>
          </Menu.Item>
          <Menu.Item index="2-3">代理店管理</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
