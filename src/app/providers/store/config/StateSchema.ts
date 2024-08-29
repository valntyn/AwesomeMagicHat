import {
    Action, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AffiliationQuizSchema } from '@/features/AffiliationQuiz';
import { StudentsSchema } from '@/screens/Students';

export interface StateSchema {
    // REQUIRED
    affiliationQuiz: AffiliationQuizSchema;

    // async below
    students?: StudentsSchema;
    charterDetails?: any;
}

export type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: Action) => any;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;

    // true - inited, false - destroyed
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
