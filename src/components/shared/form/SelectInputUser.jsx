import { useState } from "react";

const SelectInputUser = ({ users, selectedUser, setSelectedUser, label, onAdd }) => {
    return (
        <div className="d-flex align-items-center">
            <select 
                className="form-select me-2" 
                value={selectedUser} 
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                <option value="">{label}</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.firstname} {user.lastname}
                    </option>
                ))}
            </select>
            <button className="primary-button" onClick={onAdd} disabled={!selectedUser}>
                Ajouter
            </button>
        </div>
    );
};

export default SelectInputUser;
