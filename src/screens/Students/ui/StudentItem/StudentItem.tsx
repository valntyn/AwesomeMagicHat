import { memo, useCallback } from 'react';
import {
    Image, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RNText } from '@/shared/ui/Text';
import { Student } from '@/features/AffiliationQuiz/model/types/Student';
import { Card } from '@/shared/ui/Card';
import { AppRouterEnum } from '@/shared/config/routeConfig/routeConfig';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { Icon } from '@/shared/ui/Icon';
import CompletedIcon from '@/shared/assets/icons/circle-check.svg';
import WrongIcon from '@/shared/assets/icons/circle-xmark.svg';
import RetryIcon from '@/shared/assets/icons/repeat-solid.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { affiliationQuizActions } from '@/features/AffiliationQuiz';

interface StudentItemProps {
    item: Student;
    style?: StyleProp<ViewStyle>;
}

export const StudentItem = memo((props: StudentItemProps) => {
    const { style, item } = props;
    const navigation = useAppNavigation();
    const generalNavigation = useNavigation();
    const dispatch = useAppDispatch();

    const navigateToPatient = useCallback(() => {
        navigation.navigate(AppRouterEnum.CHARACTER_DETAILS, {
            studentId: item.id,
            readonly: !item.isAnswered,
        });
    }, [item.id, item.isAnswered, navigation]);

    const navigateToRetryQuiz = useCallback(() => {
        dispatch(affiliationQuizActions.selectStudentById(item.id));
        generalNavigation.navigate('Home', { studentId: item.id });
    }, [dispatch, generalNavigation, item.id]);

    return (
        <Card style={[styles.view, style]}>
            <TouchableWithoutFeedback style={styles.contentBox} onPress={navigateToPatient}>
                <Image
                    source={
                        item?.image
                            ? { uri: item.image }
                            : require('@/shared/assets/png/no-image.jpg')
                    }
                    style={styles.image}
                />
                <View style={styles.header}>
                    <RNText text={item.name} lineHeight={22} textWeight="700" textSize="s" />
                    <RNText
                        text={`Attempts: ${item.attempts}`}
                        textSize="xs"
                        numberOfLines={3}
                        lineHeight={22}
                    />
                </View>
                <View style={styles.actionsBox}>
                    {!item.isAnswered && (
                        <TouchableWithoutFeedback
                            onPress={navigateToRetryQuiz}
                            style={styles.retryButton}
                        >
                            <Icon
                                Svg={RetryIcon}
                                style={{ alignSelf: 'center' }}
                                width={32}
                                height={32}
                            />
                        </TouchableWithoutFeedback>
                    )}
                    <Icon
                        Svg={item.isAnswered ? CompletedIcon : WrongIcon}
                        style={{ alignSelf: 'center' }}
                        width={item.isAnswered ? 36 : 42}
                        height={item.isAnswered ? 36 : 42}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Card>
    );
});

const styles = StyleSheet.create({
    actionsBox: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        marginLeft: 'auto',
    },
    circleName: {
        marginRight: 10,
        width: 34,
    },
    contentBox: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '4%',
    },
    displayName: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        paddingRight: 4,
        textAlignVertical: 'center',
        width: '50%',
    },
    header: {
        flex: 1,
        marginLeft: 16,
    },
    image: {
        aspectRatio: 2 / 3,
        height: 28,
        width: 28,
    },
    notificationContainer: {
        flexDirection: 'row',
        gap: 12,
        width: 120,
    },
    notificationItem: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
        width: 34,
    },
    retryButton: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    view: {
        marginHorizontal: '8%',
    },
});
