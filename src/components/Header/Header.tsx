import styles from '../../styles/styles.module.css'
import OSK from './OSK.png';
import PKB from './PKB.jpg';

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