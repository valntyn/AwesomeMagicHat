import { createSelector } from '@reduxjs/toolkit';
import { getAnsweredIds, getStudents } from '../selectors/AffiliationSelectors';
import { Student } from '@/features/AffiliationQuiz/model/types/Student';
import { getIsStudentSearchQuery } from '@/screens/Students';

export const selectStudents = createSelector(
    [getAnsweredIds, getStudents, getIsStudentSearchQuery],
    (answeredIds, students, searchQuery) => {
        const filteredStudents = answeredIds
            .map((answeredStudent) => {
                const student = students.find((student) => student.id === answeredStudent.id);
                if (student) {
                    return {
                        id: answeredStudent.id,
                        attempts: answeredStudent.attempts,
                        isAnswered: answeredStudent.isAnswered,
                        name: student.name,
                        image: student.image,
                    } as Student;
                }
                return null;
            })
            .filter((student): student is Student => student !== null)
            .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const sortedStudents = filteredStudents.sort((a, b) => {
            if (a.isAnswered === b.isAnswered) return 0;
            return a.isAnswered ? -1 : 1;
        });

        return sortedStudents;
    },
);
