export * from './notification-types'
export * from './page-types'
export * from './firebase-types'

export interface TranslationConfig {
    key: string
    params?: any
}

export enum ProvideInjectType {
    USER_PROFILE_UPDATED = 'userProfileUpdated'
}
