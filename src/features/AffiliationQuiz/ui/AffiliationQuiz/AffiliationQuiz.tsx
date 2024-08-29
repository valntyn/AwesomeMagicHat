import { memo } from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CharacterPortrait } from './ui/CharacterPortrait';
import { AffiliationQuizButtons } from '@/features/AffiliationQuiz/ui/AffiliationQuiz/ui/AffiliationQuizButtons';
import { getSelectedStudent } from '@/features/AffiliationQuiz';

interface AffiliationQuizProps {
    style?: StyleProp<ViewStyle>;
}

export const AffiliationQuiz = memo((props: AffiliationQuizProps) => {
    const { style } = props;
    const student = useSelector(getSelectedStudent);

    return (
        <View style={[style, styles.view]}>
            <CharacterPortrait
                style={{ marginBottom: 16 }}
                image={student?.image!}
                name={student?.name}
            />
            <AffiliationQuizButtons />
        </View>
    );
});

const styles = StyleSheet.create({
    view: {},
});
