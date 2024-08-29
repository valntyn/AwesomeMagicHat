import { StateSchema } from '@/app/providers/store';

export const getIsStudentsLoading = (state: StateSchema) => state.affiliationQuiz?.isStudentsLoading || false;
export const getStudents = (state: StateSchema) => state.affiliationQuiz?.students || [];
export const getSelectedStudent = (state: StateSchema) => state.affiliationQuiz?.selectedStudent || null;
export const getQuizStatistic = (state: StateSchema) => state.affiliationQuiz?.statistics || null;
export const getAnsweredIds = (state: StateSchema) => state.affiliationQuiz?.answeredStudentsIds || [];
