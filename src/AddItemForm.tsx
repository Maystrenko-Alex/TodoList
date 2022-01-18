import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react";

export type AddItemFormPropsType = {
  addItem: (itemTitle: string) => void
}




export const AddItemForm = (props: AddItemFormPropsType) => {
  const [titleInput, setTitleInput] = useState<string>(''); // state
  const [error, setError] = useState<true | false>(false); //state
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value);
    setError(false);
  }
  const addItem = () => {
    const trimmedTitleInput = titleInput.trim();
    if (trimmedTitleInput) {
      props.addItem(trimmedTitleInput);
    } else {
      setError(true);
    }
    setTitleInput('');
  }
  const errorMessage = error
    ? <div style={{ color: 'red' }}>Title is required!</div>
    : <div>Enter  item title...</div>

  const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }
  const onClickHandler = () => addItem();

  return (
    <div>
      <input
        value={titleInput}
        onChange={changeTitle}
        onKeyPress={onKeyPressAdd}
        className={error ? 'error' : ''}
      ></input>
      <button onClick={onClickHandler}>+</button>
      {errorMessage}
    </div>
  );
}