import apiClient from './apiClient';

export const fetchKnownDocTypes = async () => {
    return apiClient.get(`/_config`).then((res) => res.data.doc_types);
};

export const fetchClauses = async () => {
    return apiClient.get(`/_config`).then((res) => res.data.clauses);
};

export const fetchBEVersion = async () => {
    return apiClient.get(`/_config`).then((res) => res.data.version);
};
