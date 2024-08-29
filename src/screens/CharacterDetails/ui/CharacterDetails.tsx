import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '@/shared/config/routeConfig/routeConfig';
import { Screen } from '@/shared/ui/Screen';
import { BackButton } from '@/widgets/BackButton/BackButton';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { CharacterPortrait } from '@/features/AffiliationQuiz';
import { CharacterData } from './ui/CharacterData';
import { GetCharacters } from '@/shared/services/interfaces/get-characters';
import { getStudents } from '@/features/AffiliationQuiz/model/selectors/AffiliationSelectors';

export const CharacterDetails = () => {
    const { params } = useRoute<RouteProp<RootStackParamList, 'CharacterDetails'>>();
    const students = useSelector(getStudents);

    const [selectedStudent, setSelectedStudent] = useState<GetCharacters | null>(null);

    useInitialEffect(() => {
        getSelectedStudent();
    });

    const getSelectedStudent = () => {
        if (params.studentId) {
            const student = students.find((s) => s.id === params.studentId);
            setSelectedStudent(student || null);
        }
    };

    if (!selectedStudent) {
        return null;
    }

    return (
        <Screen style={styles.view} edges={['left', 'right']}>
            <BackButton title={selectedStudent?.name} />
            <ScrollView style={{ paddingVertical: '2%' }}>
                <CharacterPortrait image={selectedStudent?.image!} style={{ marginVertical: 20 }} />
                <CharacterData
                    item={selectedStudent}
                    style={{ marginHorizontal: '4%' }}
                    readonly={params.readonly}
                />
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    view: {},
});
