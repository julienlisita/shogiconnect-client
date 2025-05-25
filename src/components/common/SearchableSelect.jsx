import Select from "react-select";
import { useId } from "react";

export default function SelectField({ label, value, onChange, options, name, placeholder }) {
    const id = useId();

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#fcfcfc", 
            borderRadius: "8px",
            borderColor: "#cccccc",
            padding: "5px",
            boxShadow: "none",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fcfcfc", 
        }),
        option: (provided, { isFocused, isSelected }) => ({
            ...provided,
            backgroundColor: isSelected ? "#A0785A" : isFocused ? "#D9D9D9" : "white",
            color: isSelected ? "white" : "black",
        }),
    };

    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <Select
                inputId={id}
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                styles={customStyles}
            />
        </div>
    );
}