export { CharacterPortrait } from './ui/AffiliationQuiz/ui/CharacterPortrait';

export { selectStudents } from './model/reselectors/AffiliationReselectors';

export {
    getSelectedStudent,
    getIsStudentsLoading,
    getQuizStatistic,
} from './model/selectors/AffiliationSelectors';

export {
    affiliationQuizReducer,
    affiliationQuizActions,
} from './model/slices/AffiliationQuizSlice';

export { AffiliationQuiz } from './ui/AffiliationQuiz/AffiliationQuiz';
export type { AffiliationQuizSchema } from './model/types/AffiliationQuizSchema';
