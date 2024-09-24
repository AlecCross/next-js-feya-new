import React, { useState, useEffect } from 'react';
import styles from '../styles/nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'; import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavBar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 850) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <nav>
            <div>
                <div className={styles.navbar}>
                    <div className={styles.logo}>
                        <Link href="/" aria-label="Home">
                            <svg style={{ display: "block", margin: 0, padding: 0, border: 0 }} width="100" height="60" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                                <text x="50%" y="65%" fontFamily="Verdana" fontSize="120" fill="white" textAnchor="middle" alignmentBaseline="middle">DS</text>
                            </svg>
                        </Link>
                    </div>
                    <div className={styles.burger} onClick={handleMenuToggle}>
                        <div className={isMenuOpen ? styles.burgerLineClose : styles.burgerLine}></div>
                        <div className={isMenuOpen ? "" : styles.burgerLine}></div>
                        <div className={isMenuOpen ? styles.burgerLineClose : styles.burgerLine}></div>
                    </div>
                    <ul className={styles.menuPC}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        {session ? (
                            <li>
                                Signed in as {session.user?.email}
                                <button onClick={() => signOut()}>Sign out</button>
                            </li>
                        ) : (
                            <li><button onClick={() => signIn()}>Sign in</button></li>
                        )}
                    </ul>
                    {isMenuOpen && (
                        <div className={styles.dropdown}>
                            <ul className={styles.menu}>
                                <li className={router.pathname === '/' ? styles.uHere : styles.menuItem}>
                                    <a href="/">Home</a>
                                </li>
                                <li className={`${router.pathname === '/about' ? styles.uHere : styles.menuItem}`}>
                                    <Link href="/about">About</Link>
                                </li>
                                <li className={`${router.pathname === '/contact' ? styles.uHere : styles.menuItem}`}>
                                    <Link href="/contact">Contact</Link>
                                </li>
                                {session ? (
                                    <li>
                                        Signed in as {session.user?.email}
                                        <button onClick={() => signOut()}>Sign out</button>
                                    </li>
                                ) : (
                                    <li><button onClick={() => signIn()}>Sign in</button></li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div >
        </nav >
    );
}
