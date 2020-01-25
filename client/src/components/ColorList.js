import React, { useState } from "react";
// import axios from "axios";
import axiosWithAuth from"../auth/axiosWithAuth";
import AddColor from "./AddColor";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(() => {
      setEditing(false);
    })
    .catch((err) => console.log(err));
  };

  // Edited colors are pulled from the initialcolor state, using the colortoedit
  // hooks :)

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${color.id}`, color)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" 
              onClick={e => {
                  e.stopPropagation();
                  deleteColor(color)
                  }}
              >
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <AddColor />
      
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
