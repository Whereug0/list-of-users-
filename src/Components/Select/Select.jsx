import React from "react";
import styles from './styles.module.css';

function Select({options, defaultValue, value, onChange}) {

    return(
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option
                className={styles["option"]}
                key="default" 
                disabled 
                value=""
            >
                {defaultValue}
            </option>
            {options.map(option => 
                <option key={option.key} value={option.key}>
                    { option.title }
                </option>
                
            )}
        </select>
    )
}

export default Select;