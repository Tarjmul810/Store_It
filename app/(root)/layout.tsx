import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import Sidebar from '@/components/Sidebar';
import React from 'react';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"

const Layout = async( {children}: {children: React.ReactNode} ) => {

    const currentUser = await getCurrentUser();

    if(!currentUser) return redirect('/sign-in')

    return <main className='h-screen overflow-hidden flex'>
            <Sidebar  {...currentUser}/>

            <section className='flex remove-scrollbar h-full flex-1 flex-col overflow-y-auto'>
                <MobileNavigation {...currentUser}/>
                <Header userId={currentUser.$id} accountId={currentUser.accountId} />
                
                <div className='main-content '>{children}</div>
            </section>

            <Toaster />
        </main>
}

export default Layout;