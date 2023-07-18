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
};

module.exports = nextConfig;
