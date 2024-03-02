import React from "react";
import styles from './styles.module.css';

function Input({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            type="text" 
            placeholder="Search..."
        />
    );
}

export default Input;