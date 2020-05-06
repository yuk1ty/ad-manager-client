import React from "react";
import { Chip } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";

export function AuthorityBadge(props: { authority: number }) {
  const { authority } = props;

  if (authority === 1) {
    return (
      <Chip icon={<GroupIcon />} label="管理者" size="small" color="primary" />
    );
  } else if (authority === 2) {
    return (
      <Chip
        icon={<PersonIcon />}
        label="メンバー"
        size="small"
        color="default"
      />
    );
  } else {
    return <Chip label="(不明)" size="small" color="default" />;
  }
}
