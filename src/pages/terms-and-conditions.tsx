import styles from '../styles/privacy-policy.module.css';

const TermsConditions = () => {
    return (
        <div className={styles.container}>
            <div className={styles.paragraph}>
                <div className={styles.header}>Визначення та призначення сервісу:</div>
                Опис вашого веб-сайту та його мета.
                Визначення користувачів та їх відповідальності.
            </div>
            <div className={styles.paragraph}>
                <div className={styles.header}>Умови використання:</div>
                Опис, як користувачі можуть використовувати ваш сайт та його ресурси.
                Обмеження на використання вашого контенту та сервісів.
            </div>
            <div className={styles.paragraph}>
                <div className={styles.header}>Авторське право та інтелектуальна власність:</div>
                Вказівка на те, що весь контент сайту є власністю адміністрації сайту або ліцензований.
                Заборона на копіювання та розповсюдження контенту без дозволу.
            </div>
            <div className={styles.paragraph}>
                <div className={styles.header}>Реєстрація та обліковий запис:</div>
                Умови реєстрації та управління обліковим записом.
                Зобов'язання користувача надавати точну та актуальну інформацію.
            </div>
            <div className={styles.paragraph}>
                <div className={styles.header}>Приватність та захист даних:</div>
                Опис того, як збираються, використовуються та захищаються дані користувачів.
                Політика конфіденційності, що включає інформацію про використання файлів cookie та Google Sign-In.
            </div>
            <div className={styles.paragraph}>
                <div className={styles.header}>Правила відмови від відповідальності:</div>
                Вказівки на відмову від відповідальності за помилки на сайті.
                Обмеження відповідальності за збитки, що можуть виникнути внаслідок використання сайту.
            </div>
            <div className={styles.paragraph}>
                <div className={styles.header}>Зміни умов використання:</div>
                <div className={styles.text}>
                    Право на внесення змін у умови використання та обов'язок користувачів регулярно переглядати ці зміни.
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;