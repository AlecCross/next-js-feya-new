import React, { ReactNode } from 'react'
import styles from '../styles/PageContainer.module.css'

interface PageContainerProps {
    children: ReactNode; // Використовуйте тип ReactNode для властивості children
}

export default function PageContainer({ children }: PageContainerProps) {
    return <div
        className={styles.container}
        style={{
            flex: 1,
            backgroundColor: "white",
            zIndex: 1
        }}
    >
        {children}
    </div>
}