import { URL_PATHS } from '@/lib/sitemap';
import { Redirect } from 'next';

export const defaultRedirect: Redirect = {
    destination: URL_PATHS[404],
    permanent: false,
};
