import React from "react";
import styles from './styles.module.css';

function UserItem(user)  {
    const { name, company, phone, email } = user;

    return (
        <div className={styles["user-item-info"]}>
            <p className="name">{name}</p>
            <p className="company">{company}</p>
            <p className="email">{email}</p>
            <p className="phone">{phone}</p>
        </div>
    )
}

export default UserItem;