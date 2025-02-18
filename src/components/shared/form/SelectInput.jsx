import React from 'react';

const SelectInput = ({ label, value, options, onChange, onAdd, selectedItems, onRemove }) => {
    return (
        <div className="d-flex flex-column gap-2">
            <label>{label}</label>
            <div className="d-flex gap-2">
                <select value={value} onChange={onChange}>
                    <option value="" disabled>Choisissez une option</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.firstname} {option.lastname}
                        </option>
                    ))}
                </select>
                <button onClick={onAdd} className="primary-button">Ajouter</button>
            </div>
            <ul>
                {selectedItems.map((id) => {
                    const user = options.find(user => user.id === id);
                    return user ? (
                        <li key={id}>
                            {user.firstname} {user.lastname} 
                            <button className='btn btn-danger' onClick={() => onRemove(id)}>Supprimer</button>
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default SelectInput;
