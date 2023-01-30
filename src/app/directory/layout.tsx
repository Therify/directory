'use client';
import { TopBar } from '@/components/ui/TopBar';
import React from 'react';
import '../../styles/globals.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { therifyDesignSystem } from '@/components/themes/therify-design-system';
import { TopNavigationLayout } from '@/components/ui';

interface LayoutProps {
    children: React.ReactNode;
}

export default function DirectoryLayout({ children }: LayoutProps) {
    return (
        <html>
            <head />
            <body>
                <ThemeProvider theme={therifyDesignSystem}>
                    <TopNavigationLayout navigationSlot={<TopBar />}>
                        {children}
                    </TopNavigationLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
