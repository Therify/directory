/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@nylas/nylas-js'],
    images: {
        domains: ['res.cloudinary.com'],
    },
    reactStrictMode: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
        '@mui/material': {
            transform: '@mui/material/{{member}}',
        },
    },
    redirects: async () => [
        {
            source: '/accounts/:path*',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/directory/:path*',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/members/:path*',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/providers/:path*',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/api/:path*',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/access-countdown',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/register',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/waiting-list',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/404',
            destination: '/deprecated',
            permanent: true,
        },
        {
            source: '/500',
            destination: '/deprecated',
            permanent: true,
        }, 
    ],
};

module.exports = nextConfig;
