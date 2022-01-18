import React, { ChangeEvent, KeyboardEvent, useState } from "react";;

type EditableSpanPropsType = {
  title: string,
  changeTitle: ( title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title); // state
  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    debugger
    props.changeTitle(title);
    setEditMode(false);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    debugger
    setTitle(e.currentTarget.value);
  }
  const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    debugger
    if (e.key === 'Enter') {
      offEditMode()
  }
}
  return (
    
    editMode 
      ? <input 
        value={title} 
        // size={11} 
        autoFocus 
        onBlur={offEditMode}
        onChange={changeTitle}
        onKeyPress={onKeyPressOffEditMode}
      /> 
      : <span onDoubleClick={onEditMode} >{props.title}</span>
    
  );
}