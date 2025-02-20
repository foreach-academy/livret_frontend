import React from "react";

const SelectInputGeneric = ({
    label,
    options,
    selectedValue,
    onChange,
    onAdd,
    selectedItems = [],
    onRemove,
    showSelectedList = false,
}) => {
    return (
        <div className="d-flex flex-column gap-2">
            <label>{label}</label>
            <div className="d-flex gap-2">
                <select className="form-select me-2" value={selectedValue} onChange={onChange}>
                    <option value="">{label}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.firstname} {option.lastname}
                        </option>
                    ))}
                </select>
                <button className="primary-button" onClick={onAdd} disabled={!selectedValue}>
                    Ajouter
                </button>
            </div>

            {showSelectedList && selectedItems.length > 0 && (
                <ul>
                    {selectedItems.map((id) => {
                        const user = options.find((user) => user.id === id);
                        return user ? (
                            <li key={id}>
                                {user.firstname} {user.lastname}
                                <button className="btn btn-danger ms-2" onClick={() => onRemove(id)}>
                                    Supprimer
                                </button>
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </div>
    );
};

export default SelectInputGeneric;
