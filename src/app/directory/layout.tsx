'use client';
import { TopBar } from '@/components/ui/TopBar';
import React from 'react';
import '../../styles/globals.css';
import { TopNavWebPage } from '@/components/ui/Layout/TopNavWebPage';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { therifyDesignSystem } from '@/components/themes/therify-design-system';

interface LayoutProps {
    children: React.ReactNode;
}

export default function DirectoryLayout({ children }: LayoutProps) {
    return (
        <html>
            <head />
            <body>
                <ThemeProvider theme={therifyDesignSystem}>
                    <TopNavWebPage navigationSlot={<TopBar />}>
                        {children}
                    </TopNavWebPage>
                </ThemeProvider>
            </body>
        </html>
    );
}
