import styles from '../../styles/styles.module.css'
import OSK from './OSK.png';
import PKB from './PKB.jpg';
/*import Arrow from '../images/Arrow.png'

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
}*/

export default function HeaderCom () {
    return( 
        <>
            <div className={styles.header_images}>
                <img src={OSK} title='OSK'></img>
                <img src={PKB} title='PKB'></img>
            </div>
            <div className={styles.header_title}> 
                <p><span className={styles.header_title_span1}>НЕВСКОЕ</span> <br/>
                <span className={styles.header_title_span2}>ПРОЕКТНО-КОНСТРУКТОРСКОЕ БЮРО</span></p>
            </div>
        </>
    );
}