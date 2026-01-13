import { Buffer } from 'buffer';

export const decodeTokenManual = (token: string) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const base64Url = parts[1];
        // JWT uses Base64Url encoding, which needs conversion for standard Base64 decoders
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        // Use Buffer or atob for decoding in React Native environment
        // Example using Buffer:
        const decoded = JSON.parse(Buffer.from(base64, 'base64').toString());
        
        // Example using window.atob (might need polyfills in some RN versions)
        // const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        // }).join(''));
        // return JSON.parse(jsonPayload);

        return decoded;

    } catch (e) {
        console.error("Error decoding token manually:", e);
        return null;
    }
};