import React from "react";
import Button from "../Button";

const SelectInputGeneric = ({
    label,
    options,
    selectedValue,
    onChange,
    onAdd,
    selectedItems = [],
    onRemove,
    showSelectedList = false,
    getOptionLabel = (option) => option.id, 
    className
}) => {

    return (
        <div className={`d-flex flex-column gap-2 ${className}`}>
            <label>{label}</label>
            <div className="d-flex gap-2">
                <select className="form-select me-2" value={selectedValue} onChange={onChange}>
                    <option value="">{label}</option>
                    {options.map((option,index) => (
                        <option key={index} value={option.id}>
                            {getOptionLabel(option)} 
                        </option>
                    ))}
                </select>
                {onAdd && (
                    <Button
                        buttonTitle="Ajouter"
                        className="bg-fe-orange"
                        setAction={onAdd}
                    />
                )}
            </div>

            {showSelectedList && selectedItems.length > 0 && (
                <ul>
                    {selectedItems.map((id,index) => {
                        const item = options.find((item) => item.id === id);
                        return item && (
                            <li key={index}>
                                {getOptionLabel(item)}
                                <Button
                                    buttonTitle="Retirer"
                                    className="bg-danger"
                                    setAction={() => onRemove(id)}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SelectInputGeneric;
