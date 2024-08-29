import { memo, useCallback } from 'react';
import {
    Image, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RNText } from '@/shared/ui/Text';
import { RNButton } from '@/shared/ui/Button';
import { affiliationQuizActions, getSelectedStudent } from '@/features/AffiliationQuiz';
import { HOUSE_DATA } from '@/features/AffiliationQuiz/const/house-data';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { CharacterHouse } from '@/shared/services/model/character/house';

interface AffiliationQuizButtonsProps {
    style?: StyleProp<ViewStyle>;
}

export const AffiliationQuizButtons = memo((props: AffiliationQuizButtonsProps) => {
    const { style } = props;
    const dispatch = useAppDispatch();

    const student = useSelector(getSelectedStudent);

    const selectHouse = useCallback(
        (house: CharacterHouse | null) => () => {
            const answer = student?.house ? student.house : null;

            if (house === answer) {
                dispatch(affiliationQuizActions.correctAnswer());
            } else {
                dispatch(affiliationQuizActions.incorrectAnswer());
            }

            dispatch(affiliationQuizActions.selectRandomStudent());
        },
        [dispatch, student?.house],
    );

    return (
        <View style={[style, styles.container]}>
            <View style={styles.row}>
                {HOUSE_DATA.slice(0, 2).map((house) => (
                    <RNButton
                        key={house.name}
                        theme="secondary"
                        border={4}
                        minHeight={90}
                        style={styles.button}
                        onPress={selectHouse(house.name)}
                    >
                        <Image source={house.image} style={styles.image} />
                        <RNText text={house.name} textSize="s" lineHeight={18} />
                    </RNButton>
                ))}
            </View>
            <View style={styles.row}>
                {HOUSE_DATA.slice(2, 4).map((house) => (
                    <RNButton
                        key={house.name}
                        theme="secondary"
                        border={4}
                        minHeight={90}
                        style={styles.button}
                        onPress={selectHouse(house.name)}
                    >
                        <Image source={house.image} style={styles.image} />
                        <RNText text={house.name} textSize="s" lineHeight={18} />
                    </RNButton>
                ))}
            </View>
            <RNButton
                theme="secondary"
                border={4}
                minHeight={70}
                fullWidth
                onPress={selectHouse(null)}
            >
                <RNText text="Not in House" textSize="s" lineHeight={18} textWeight="600" />
            </RNButton>
        </View>
    );
});

const styles = StyleSheet.create({
    button: {
        flex: 1,
        gap: 2,
    },
    container: {
        flex: 1,
    },
    image: {
        height: 40,
        width: 40,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
});
