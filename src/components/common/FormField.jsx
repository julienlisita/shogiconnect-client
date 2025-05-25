import { useId } from "react"
import "./FormField.css"

export default function Input({type="text", value, label, onChange, rows, ...props })
{
    const id = useId();
    return (
        <div>
            {label && <label className="form-label" htmlFor={id}>{label}</label>}
            {type === "textarea" ? (
            <textarea
                className="form-field" 
                id={id}
                rows={rows}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                {...props}
            ></textarea>
        ) : (
            <input 
                className="form-field" 
                id={id} 
                type={type} 
                value={value} 
                onChange={(e)=>onChange(e.target.value)}
                {...props}
            />
        )}
        </div>
    )
}