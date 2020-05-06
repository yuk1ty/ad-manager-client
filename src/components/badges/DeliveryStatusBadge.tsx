import React from "react";
import { Chip } from "@material-ui/core";

export function DeliveryStatusBadge(props: { status: number }) {
  const { status } = props;
  if (status === 1) {
    return <Chip label="配信準備中" color="default" size="small" />;
  } else if (status === 2) {
    return <Chip label="未配信" color="default" size="small" />;
  } else if (status === 3) {
    return <Chip label="配信中" color="primary" size="small" />;
  } else if (status === 4) {
    return <Chip label="一時停止中" color="primary" size="small" />;
  } else if (status === 5) {
    return <Chip label="配信終了" color="secondary" size="small" />;
  } else {
    // 想定外のステータスが来たとき用
    return <Chip label="(不明)" color="default" size="small" />;
  }
}
