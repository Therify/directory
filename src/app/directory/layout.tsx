'use client';
import { TopBar } from '@/components/ui/TopBar';
import React from 'react';
import '../../styles/globals.css';
import { TopNavWebPage } from '@/components/ui/Layout/TopNavWebPage';

interface LayoutProps {
    children: React.ReactNode;
}

export default function DirectoryLayout({ children }: LayoutProps) {
    return (
        <html>
            <head />
            <body>
                <TopNavWebPage navigationSlot={<TopBar />}>
                    {children}
                </TopNavWebPage>
            </body>
        </html>
    );
}
