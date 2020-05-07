import React, { SyntheticEvent } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

interface TableSideOperationProps<E> {
  entity: E;
  onEditClick: (e: SyntheticEvent, entity: E) => void;
  onDeleteClick: (e: SyntheticEvent, entity: E) => void;
}

export function TableSideOperations<E>(props: TableSideOperationProps<E>) {
  return (
    <>
      <Tooltip title="編集">
        <IconButton
          onClick={(e) => props.onEditClick(e, props.entity)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="削除">
        <IconButton
          onClick={(e) => props.onDeleteClick(e, props.entity)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
}
