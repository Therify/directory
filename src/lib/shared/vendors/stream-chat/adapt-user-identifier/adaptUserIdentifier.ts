const AUTH0_IDENTITY_PROVIDER = 'auth0|' as const;

interface Adapter {
    fromStreamChat(id: string): string;
    makeStreamChatSafe(id: string): string;
    fromMany(ids: string[]): string[];
    makeManySafe(ids: string[]): string[];
}

/**
 * Adds the "auth0|" prefix to the user id
 * @param id - The user id as it is stored in the database
 * @returns
 */
export const fromStreamChat: Adapter['fromStreamChat'] = (id) => {
    return `${AUTH0_IDENTITY_PROVIDER}${id}`;
};

/**
 * Removes the "auth0|" prefix from the user id
 * @param id - The user id as it is stored in Stream Chat
 * @returns
 */
export const makeStreamChatSafe: Adapter['makeStreamChatSafe'] = (id) => {
    return id.replace(AUTH0_IDENTITY_PROVIDER, '');
};

/**
 * Adds the "auth0|" prefix to the user ids
 * @param ids - The user ids as they are stored in the database
 * @returns
 */
export const fromMany: Adapter['fromMany'] = (ids) => {
    return ids.map(fromStreamChat);
};

/**
 * Removes the "auth0|" prefix from the user ids
 * @param ids - The user ids as they are stored in Stream Chat
 * @returns
 */
export const makeManySafe: Adapter['makeManySafe'] = (ids) => {
    return ids.map(makeStreamChatSafe);
};
