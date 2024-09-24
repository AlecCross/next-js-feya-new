import Link from 'next/link';
import React from 'react';
import { useSession, getSession } from "next-auth/react";
import Error404 from '../404';
import { GetServerSideProps } from 'next';

interface AdminProps {
    session: any; // Çàì³í³òü `any` íà á³ëüø êîíêðåòíèé òèï, ÿêùî â³äîìî
  }

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return { props: {}, notFound: true }; // Çà çàìîâ÷óâàííÿì âñòàíîâëþº ñòàòóñ 404
    }
  
    return { props: { session } };
  };

  const Admin: React.FC<AdminProps> = ({ session }) => {
    
  if (!session) {
    // Ïîêàçóâàòè 404 ñòîð³íêó àáî ïåðåíàïðàâëÿòè
    return <Error404/>;
  }
    return (
        <div>
            <div>Admin panel</div>
            <div style={{color: "blue"}}>
                <Link href={`/admin/products`}>
                    Products
                </Link>
            </div>
            <div  style={{color: "blue"}}>
                <Link href={`/admin/categories/`}>
                    Categories
                </Link>
            </div>
        </div>
    );
};

export default Admin;
