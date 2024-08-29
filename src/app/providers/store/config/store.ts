import {
    Action,
    configureStore,
    EnhancedStore,
    ReducersMapObject,
    StoreEnhancer,
    ThunkDispatch,
    Tuple,
    UnknownAction,
} from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage';
import {
    FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import { $api } from '@/shared/api/api';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { affiliationQuizReducer } from '@/features/AffiliationQuiz';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    timeout: 0,
};

export let store: EnhancedStore<
    any,
    Action,
    Tuple<
        [
            StoreEnhancer<{ dispatch: ThunkDispatch<any, ThunkExtraArg, UnknownAction> }>,
            StoreEnhancer,
        ]
    >
>;

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    if (!store) {
        const rootReducers: ReducersMapObject<StateSchema> = {
            ...asyncReducers,
            affiliationQuiz: affiliationQuizReducer,
        };

        const reducerManager = createReducerManager(rootReducers);

        const extraArg: ThunkExtraArg = {
            api: $api,
        };

        store = configureStore({
            reducer: reducerManager.reduce,
            preloadedState: initialState,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
        });
        // @ts-ignore
        store.reducerManager = reducerManager;
    }

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
