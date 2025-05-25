import { useId } from "react";
import "./Select.css";

export default function Select({ label, value, onChange, options, name, ...props }) {
    const id = useId();

    return (
        <div className="select-wrapper">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <select
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-select"
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}