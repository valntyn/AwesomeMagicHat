import { GetCharacters } from '@/shared/services/interfaces/get-characters';
import { StatiscticState } from '@/shared/types/statistic.ts';

export interface AffiliationQuizSchema {
    students?: GetCharacters[] | null;
    error?: string;
    isStudentsLoading?: boolean;
    selectedStudent?: GetCharacters | null;
    statistics?: Record<StatiscticState, number> | null;
    answeredStudentsIds?: { id: string; attempts: number; isAnswered?: boolean }[] | null;
}
