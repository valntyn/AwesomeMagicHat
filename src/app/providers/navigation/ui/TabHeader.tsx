import React, { memo, useCallback } from 'react';
import {
    Platform, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RNText } from '@/shared/ui/Text';
import { TabRouteParams } from '@/shared/config/routeConfig/tabRouterConfig';
import { RNButton } from '@/shared/ui/Button';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { affiliationQuizActions } from '@/features/AffiliationQuiz';
import { getCharactersStudents } from '@/shared/services/charactersService';

interface TabHeaderProps {
    style?: StyleProp<ViewStyle>;
    route: TabRouteParams;
}

export const HEADER_HEIGHT = 60;

export const TabHeader = memo((props: TabHeaderProps) => {
    const { style, route } = props;
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    const generateHeaderTitle = useCallback(() => {
        switch (route.name) {
        case 'Home':
            return 'Home Screen';
        case 'Characters':
            return 'List Screen';
        default:
            return null;
        }
    }, [route.name]);

    const resetQuizData = useCallback(() => {
        dispatch(affiliationQuizActions.resetState());
        dispatch(getCharactersStudents());
    }, [dispatch]);

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top, height: HEADER_HEIGHT + insets.top },
            ]}
        >
            <RNText
                style={{ alignSelf: 'center' }}
                text={generateHeaderTitle() || 'Screen'}
                textWeight="700"
                lineHeight={32}
            />
            <RNButton
                theme="outlined"
                width={80}
                style={{ position: 'absolute', right: '4%', bottom: 0 }}
                height={HEADER_HEIGHT}
                onPress={resetQuizData}
            >
                <RNText text="Reset" textSize="s" textWeight="700" lineHeight={32} />
            </RNButton>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: globalStylesVariables.background,
        flexDirection: 'row',
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.15)',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 12,
            },
            android: { elevation: 2 },
        }),
    },
});
