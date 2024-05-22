import React from "react";
import styles from '../styles/styles.module.css';
import Arrow from '../images/Arrow.png'

export default function Header () {
    return (
        <div className={styles.header_container}>
            <ul className={styles.header_nav}>
                <li>№ ППУ</li>
                <li>Дата составления</li>
                <li> Автор ППУ</li>
                <li>Объект улучшения</li>
                <li>Тип ППУ</li>
            </ul>
            <div className={styles.main}>
                <img src={Arrow} alt="arrow"></img>
            </div>
        </div>
    )
}