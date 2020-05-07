import React from "react";
import { Chip } from "@material-ui/core";

export function DeliverySwitchBadge(props: { state: number }) {
  const { state } = props;

  if (state === 1) {
    return <Chip label="配信ON" color="default" size="small" />;
  } else {
    return <Chip label="配信OFF" color="default" size="small" />;
  }
}
