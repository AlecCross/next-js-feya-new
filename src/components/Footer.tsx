import React from 'react'
import styles from '../styles/footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <Link href="/" aria-label="Feya">
                        <svg style={{ display: "block", margin: 0, padding: 0, border: 0 }} width="100" height="60" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                            <text x="50%" y="65%" fontFamily="Verdana" fontSize="120" fill="white" textAnchor="middle" alignmentBaseline="middle">Feya</text>
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
