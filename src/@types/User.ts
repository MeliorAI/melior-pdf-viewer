export interface FrontEggUser {
    metadata: UserMetadata;
}

export interface UserMetadata {
    language: string;
    boxUserId?: string;
    storageUserId?: string;
}
