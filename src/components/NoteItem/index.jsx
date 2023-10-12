import { FiPlus, FiX } from "react-icons/fi";

import { Container } from "./styles";

export function NoteItem({ IsNew = false, value, onClick, ...rest }) {
  return (
    <Container $isnew={IsNew}>
      <input type="text" value={value} readOnly={!IsNew} {...rest} />
      <button
        type="button"
        onClick={onClick}
        className={IsNew ? "button-add" : "button-delete"}
      >
        {IsNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  );
}
