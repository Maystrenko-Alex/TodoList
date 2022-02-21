import { TextField } from "@material-ui/core";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";;

type EditableSpanPropsType = {
  title: string,
  changeTitle: (title: string) => void
  className?: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title); // state
  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    props.changeTitle(title);
    setEditMode(false);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      offEditMode()
    }
  }
  return (

    editMode
      ? <TextField
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"
        size='small'
        value={title}
        autoFocus
        onBlur={offEditMode}
        onChange={changeTitle}
        onKeyPress={onKeyPressOffEditMode} />
      : <span onDoubleClick={onEditMode} className={props.className}>{props.title}</span>
  );
}