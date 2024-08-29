import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getIsStudentsLoading, getQuizStatistic, selectStudents } from '@/features/AffiliationQuiz';
import { DynamicModuleLoader, ReducersList } from '@/shared/components/DynamicModuleLoader';
import { Screen } from '@/shared/ui/Screen';
import { StudentSearchField } from './StudentSearchField/StudentSearchField';
import { StudentsList } from './StudentsList/StudentsList';
import { Statisctics } from '@/widgets/Statistics/Statisctics';
import { RNText } from '@/shared/ui/Text';
import { studentsReducer } from '@/screens/Students/model/slices/StudentsSlice';

const initialReducers: ReducersList = {
    students: studentsReducer,
};

export const Students = () => {
    const isStudentsLoading = useSelector(getIsStudentsLoading);
    const quizStatistic = useSelector(getQuizStatistic);
    const students = useSelector(selectStudents);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount>
            <Screen edges={['left', 'right']}>
                <View style={styles.container}>
                    <Statisctics
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: '8%',
                            marginVertical: 20,
                        }}
                        isLoading={isStudentsLoading}
                        data={[
                            { label: 'Total', value: quizStatistic?.total! },
                            { label: 'Success', value: quizStatistic?.success! },
                            { label: 'Failed', value: quizStatistic?.failed! },
                        ]}
                    />
                    <StudentSearchField
                        style={{
                            paddingHorizontal: '8%',
                        }}
                    />
                    {students.length ? (
                        <StudentsList data={students} />
                    ) : (
                        <View style={{ padding: '4%', alignItems: 'center' }}>
                            <RNText
                                text="No students were found"
                                lineHeight={20}
                                style={{ textAlign: 'center' }}
                                textWeight="500"
                            />
                        </View>
                    )}
                </View>
            </Screen>
        </DynamicModuleLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '2%',
    },
});
