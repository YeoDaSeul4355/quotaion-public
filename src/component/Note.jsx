import React from "react";

function Note() {
  return (
    <tr>
      <td colSpan="1" className="note gray">
        비고
      </td>
      <td colSpan="7" className="noteInput">
        <textarea rows="8"></textarea>
      </td>
    </tr>
  );
}

export default Note;
