import { StateSchema } from '@/app/providers/store';

export const getIsStudentSearchFieldOpen = (state: StateSchema) => state.students?.isSearchFieldOpen || false;
export const getIsStudentSearchQuery = (state: StateSchema) => state.students?.searchQuery || '';
