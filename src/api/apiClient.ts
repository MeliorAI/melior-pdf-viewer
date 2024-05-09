import axios from 'axios';
const backendAPIClient = axios.create();

const interceptor = (config) => {
    const backendBaseURL = 'https://dev.api.eu.melior.ai/v5.0/';
    config.baseURL = backendBaseURL ? backendBaseURL : config.baseURL;
    // config.headers.Authorization = `Bearer ${user?.accessToken}`;
    return config;
};

backendAPIClient.interceptors.request.use(interceptor);

export default backendAPIClient;
