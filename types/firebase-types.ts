import {Timestamp} from 'firebase/firestore'

export interface Image {
    src: string
    alt?: string
    path?: string
}

// auth types
export enum ProviderType {
    PASSWORD = 'password',
    GOOGLE = 'google.com',
    TWITTER = 'twitter.com',
    FACEBOOK = 'facebook.com',
}

export interface ProviderData {
    providerType: ProviderType
    displayName?: string
    email?: string
    phoneNumber?: string
    photoURL?: string
    uid?: string
}

export interface AuthUser {
    displayName: string
    email?: string
    profilePhoto?: Image
    userId: string
    username: string
    emailVerified: boolean
    providers: ProviderData[]
}

// firestore types
export enum FirebaseQueryOperator {
    LT = '<',
    LE = '<=',
    EQ = '==',
    GE = '>=',
    GT = '>',
    IN = 'in',
    ARRAY_CONTAINS = 'array-contains',
    ARRAY_CONTAINS_ANY = 'array-contains-any',
}

export interface WhereClause {
    field: string
    operator: FirebaseQueryOperator
    value: any
}

export interface OrderBy {
    field: string
    direction: 'asc' | 'desc'
}

export const CollectionField = {
    COMMON: {
        id: 'id',
        status: 'status',
        slug: 'slug'
    }
}

export enum FirestoreCollection {
    USER_PROFILE = 'user-profile'
}

export interface BaseModel {
    id?: string
    createdAt?: Timestamp | Date
    createdBy?: string
    updatedAt?: Timestamp | Date
    updatedBy?: string
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export enum AlbumType {
    PROFILE = 'PROFILE',
    COVER = 'COVER',
    CUSTOM = 'CUSTOM',
}

export interface Album extends BaseModel {
    name: string
    albumType: AlbumType
    userId: string
}

export interface AlbumImage extends BaseModel {
    albumId?: string
    image?: Image
}

export interface UserProfile extends BaseModel {
    name?: {
        firstName?: string
        middleName?: string
        lastName?: string
    }
    username: string
    gender?: Gender
    email?: string
    about?: string
    profilePhoto: AlbumImage
    coverPhoto: AlbumImage
}