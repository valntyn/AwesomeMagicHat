import { memo, useCallback, useState } from 'react';
import {
    Keyboard, StyleProp, StyleSheet, TextInput, View, ViewStyle,
} from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';
import { RNButton } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import CrossIcon from '@/shared/assets/icons/xmark.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { studentsActions } from '@/screens/Students/model/slices/StudentsSlice';
import { RNText } from '@/shared/ui/Text.tsx';
import { getIsStudentSearchFieldOpen } from '../../model/selectors/studentsSelectors';

interface StudentSearchFieldProps {
    style?: StyleProp<ViewStyle>;
}

const ANIMATED_BOX_HEIGHT = 65;

export const StudentSearchField = memo((props: StudentSearchFieldProps) => {
    const { style } = props;
    const dispatch = useAppDispatch();

    const isStudentSearchFieldOpen = useSelector(getIsStudentSearchFieldOpen);
    const [localSearchQuery, setLocalSearchQuery] = useState('');

    const debouncedSearchChange = useDebounce((value: string) => {
        dispatch(studentsActions.setSearchQuery(value));
    }, 500);

    const onSearchChange = useCallback(
        (value: string) => {
            setLocalSearchQuery(value);
            debouncedSearchChange(value);
        },
        [debouncedSearchChange],
    );

    const handleInputFocus = useCallback(() => {
        dispatch(studentsActions.setIsSearchFieldOpen(true));
    }, [dispatch]);

    const clearSearch = useCallback(() => {
        setLocalSearchQuery('');
        dispatch(studentsActions.setSearchQuery(''));
    }, [dispatch]);

    const dismissSearchMode = useCallback(() => {
        Keyboard.dismiss();
        dispatch(studentsActions.setIsSearchFieldOpen(false));
        dispatch(studentsActions.setSearchQuery(''));
        clearSearch();
    }, [clearSearch, dispatch]);

    return (
        <View style={[style, styles.view]}>
            <View style={{ flex: 1 }}>
                <TextInput
                    onChangeText={onSearchChange}
                    value={localSearchQuery}
                    style={styles.textInput}
                    placeholder="Filter characters..."
                    maxFontSizeMultiplier={1.3}
                    placeholderTextColor="#7c7e86"
                    onFocus={handleInputFocus}
                />
                <Icon
                    Svg={SearchIcon}
                    fill={globalStylesVariables.darkBlue}
                    width={18}
                    height={18}
                    style={styles.searchIcon}
                />
                {localSearchQuery && (
                    <Animated.View
                        entering={FadeIn.duration(300)}
                        style={{ position: 'absolute', right: 20 }}
                    >
                        <RNButton
                            theme="outlined"
                            width={32}
                            height={32}
                            onPress={clearSearch}
                            style={{ right: -4, top: 12 }}
                        >
                            <Icon
                                Svg={CrossIcon}
                                fill={globalStylesVariables.darkBlue}
                                width={22}
                                height={22}
                            />
                        </RNButton>
                    </Animated.View>
                )}
            </View>
            {isStudentSearchFieldOpen && (
                <Animated.View entering={SlideInRight.duration(300)}>
                    <RNButton
                        width={70}
                        height={30}
                        theme="outlined"
                        onPress={dismissSearchMode}
                        withoutFeedback
                    >
                        <RNText text="Cancel" textSize="s" type="action" textWeight="700" />
                    </RNButton>
                </Animated.View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: globalStylesVariables.white,
        borderBottomWidth: 1,
        borderColor: globalStylesVariables.white,
        borderTopEndRadius: 12,
        borderTopStartRadius: 12,
        height: ANIMATED_BOX_HEIGHT,
        marginTop: '2%',
    },
    searchIcon: {
        left: 20,
        position: 'absolute',
        top: 18,
    },
    textInput: {
        backgroundColor: globalStylesVariables.white,
        borderRadius: 8,
        flex: 1,
        fontSize: 18,
        height: 55,
        paddingLeft: 55,
        paddingRight: 40,
        paddingVertical: 0,
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        height: 55,
        justifyContent: 'center',
        marginBottom: 10,
    },
});
