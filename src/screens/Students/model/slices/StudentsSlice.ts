import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentsSchema } from '../types/StudentsSchema';

const initialState: StudentsSchema = {
    isSearchFieldOpen: false,
    searchQuery: '',
};

export const StudentsSlice = createSlice({
    name: 'Students',
    initialState,
    reducers: {
        setIsSearchFieldOpen: (state, action: PayloadAction<boolean>) => {
            state.isSearchFieldOpen = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: studentsActions } = StudentsSlice;
export const { reducer: studentsReducer } = StudentsSlice;
