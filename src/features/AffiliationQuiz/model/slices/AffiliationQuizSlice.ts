import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AffiliationQuizSchema } from '../types/AffiliationQuizSchema';
import { getCharactersStudents } from '@/shared/services/charactersService';
import { GetCharacters } from '@/shared/services/interfaces/get-characters';

const initialState: AffiliationQuizSchema = {
    students: [],
    isStudentsLoading: false,
    statistics: { total: 0, failed: 0, success: 0 },
    selectedStudent: null,
    answeredStudentsIds: [],
};

export const AffiliationQuizSlice = createSlice({
    name: 'AffiliationQuiz',
    initialState,
    reducers: {
        selectRandomStudent: (state) => {
            if (state.students?.length) {
                const randomIndex = Math.floor(Math.random() * state.students.length);
                state.selectedStudent = state.students[randomIndex];
            }
        },
        selectStudentById: (state, action: PayloadAction<string>) => {
            const studentId = action.payload;
            const student = state.students?.find((s) => s.id === studentId);
            if (student) {
                state.selectedStudent = student;
            }
        },
        correctAnswer: (state) => {
            if (state.statistics) {
                state.statistics.total += 1;
                state.statistics.success += 1;

                const studentId = state.selectedStudent?.id;
                if (studentId) {
                    const existingEntry = state.answeredStudentsIds?.find(
                        (entry) => entry.id === studentId,
                    );

                    if (existingEntry) {
                        existingEntry.isAnswered = true;
                        existingEntry.attempts += 1;
                    } else {
                        state.answeredStudentsIds?.push({
                            id: studentId,
                            attempts: 1,
                            isAnswered: true,
                        });
                    }
                }
            }
        },
        incorrectAnswer: (state) => {
            if (state.statistics) {
                state.statistics.total += 1;
                state.statistics.failed += 1;

                const studentId = state.selectedStudent?.id;
                if (studentId) {
                    const existingEntry = state.answeredStudentsIds?.find(
                        (entry) => entry.id === studentId,
                    );
                    if (existingEntry) {
                        existingEntry.attempts += 1;
                    } else {
                        state.answeredStudentsIds?.push({ id: studentId, attempts: 1 });
                    }
                }
            }
        },
        resetState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCharactersStudents.pending, (state) => {
                state.error = undefined;
                state.isStudentsLoading = true;
            })
            .addCase(
                getCharactersStudents.fulfilled,
                (state, action: PayloadAction<GetCharacters[]>) => {
                    state.isStudentsLoading = false;
                    state.students = action.payload;
                    const randomIndex = Math.floor(Math.random() * state.students.length);
                    state.selectedStudent = state.students[randomIndex];
                },
            )
            .addCase(getCharactersStudents.rejected, (state, action) => {
                state.isStudentsLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: affiliationQuizActions } = AffiliationQuizSlice;
export const { reducer: affiliationQuizReducer } = AffiliationQuizSlice;
