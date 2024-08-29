import { useCallback, useRef, useState } from 'react';
import {
    RefreshControl, ScrollView, StyleSheet, View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Screen } from '@/shared/ui/Screen';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { Statisctics } from '@/widgets/Statistics/Statisctics';
import {
    AffiliationQuiz,
    affiliationQuizActions,
    getIsStudentsLoading,
    getQuizStatistic,
} from '@/features/AffiliationQuiz';
import { getCharactersStudents } from '@/shared/services/charactersService';
import { DynamicModuleLoader, ReducersList } from '@/shared/components/DynamicModuleLoader';

const initialReducers: ReducersList = {};

export const Home = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const quizStatistic = useSelector(getQuizStatistic);
    const isStudentsLoading = useSelector(getIsStudentsLoading);

    const scrollRef = useRef(null);

    useInitialEffect(async () => {
        await getInitialData();
    });

    const getInitialData = useCallback(async () => {
        await dispatch(getCharactersStudents());
    }, [dispatch]);

    const getRandomCharacter = useCallback(() => {
        dispatch(affiliationQuizActions.selectRandomStudent());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterMount={false}>
            <Screen edges={['left', 'right']} type="initial">
                <ScrollView
                    contentContainerStyle={styles.scrollPage}
                    ref={scrollRef}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getRandomCharacter} />
                    }
                >
                    <View style={styles.flexContainer}>
                        <Statisctics
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 20,
                            }}
                            isLoading={isStudentsLoading}
                            data={[
                                { label: 'Total', value: quizStatistic?.total! },
                                { label: 'Success', value: quizStatistic?.success! },
                                { label: 'Failed', value: quizStatistic?.failed! },
                            ]}
                        />
                        <AffiliationQuiz />
                    </View>
                </ScrollView>
            </Screen>
        </DynamicModuleLoader>
    );
};

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '4%',
    },
    scrollPage: {
        paddingHorizontal: '8%',
        paddingVertical: '2%',
    },
});
