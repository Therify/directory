import axios from 'axios';
import * as GetFormSubmissions from './get-form-submissions';
/**
 * @description - Base URL for JotForm API
 */
const baseURL = 'https://hipaa-api.jotform.com/v1';

/**
 * @description - Create JotForm API client
 * @param APIKEY - JotForm API Key
 * @returns - JotForm API Client
 */
export const createInstance = (APIKEY: string) => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            APIKEY,
        },
    });
    return {
        getFormSubmissions: GetFormSubmissions.factory(instance),
    };
};

export type Client = ReturnType<typeof createInstance>;
