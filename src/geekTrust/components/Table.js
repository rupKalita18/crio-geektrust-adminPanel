import React from "react";

export default function Table({
  data,
  pagination,
  handleClick,
  handleChecked,
  checkboxArray,
  edit,
  handleChangeInput,
  handleClickSave,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.length > 0 &&
          data[pagination.currentPage - 1].map((item) => (
            <tr key={item.id} className={checkboxArray.includes(item.id)?"selected":""}>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxArray.includes(item.id) ? true : false}
                  onChange={(e) => {
                    handleChecked(e, item.id);
                  }}
                  className="checkbox"
                />
              </td>
              <td>
                {item.id === edit.id ? (<input id="name" value={edit.inputValueName} onChange={handleChangeInput} />):(item.name)}
              </td>
              <td>
                {item.id === edit.id ? (<input id="email" value={edit.inputValueEmail} onChange={handleChangeInput} />) : (item.email)}
              </td>
              <td>
                {item.id === edit.id ? (<input id="role" value={edit.inputValueRole} onChange={handleChangeInput} />) : (item.role)}
              </td>
              <td>
                <button
                  id="edit"
                  onClick={(e) => {
                    if(item.id===edit.id){
                      handleClickSave(e,item.id);
                      return;
                    }
                    handleClick(e, item.id);
                  }}
                  className="edit"
                >
                  {item.id===edit.id?"Save":"Edit"}
                </button>
                <button
                  id="delete"
                  onClick={(e) => {
                    handleClick(e, item.id);
                  }}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
