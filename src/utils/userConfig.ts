const USER_CONFIG_KEY = 'fronteggUserConfig';

export interface FronteggUserConfig {
    backendBaseUrl: string;
    websocketBaseUrl: string;
    subscriptionStatus: string;
}

export function saveUserConfig(config: FronteggUserConfig) {
    localStorage.setItem(USER_CONFIG_KEY, JSON.stringify(config));
    return config;
}

export function getUserConfig(): FronteggUserConfig | null {
    const config = localStorage.getItem(USER_CONFIG_KEY);
    return config ? (JSON.parse(config) as FronteggUserConfig) : null;
}

export function removeUserConfig() {
    localStorage.removeItem(USER_CONFIG_KEY);
}

export function removeRedirectTo() {
    localStorage.removeItem('redirectTo');
}
