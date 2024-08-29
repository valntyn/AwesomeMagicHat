import React, { memo, ReactNode, useCallback } from 'react';
import {
    Platform, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';
import { Icon } from '@/shared/ui/Icon';
import ArrowLeft from '@/shared/assets/icons/arrow-left.svg';
import { useAppNavigation } from '@/shared/hooks/useAppNavigation';
import { RNButton } from '@/shared/ui/Button';
import { RNText } from '@/shared/ui/Text';
import { HEADER_HEIGHT } from '@/app/providers/navigation/ui/TabHeader';

interface BackButtonProps {
    style?: StyleProp<ViewStyle>;
    title?: string;
    icon?: any;
    additionalAction?: ReactNode;
    customIcon?: ReactNode;
    height?: number;
}

export const BackButton = memo((props: BackButtonProps) => {
    const {
        style, icon, title = '', additionalAction, customIcon, height = HEADER_HEIGHT,
    } = props;

    const insets = useSafeAreaInsets();
    const navigation = useAppNavigation();

    const onBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={[styles.view, style, { height: height + insets.top, paddingTop: insets.top }]}>
            <View style={styles.innerView}>
                <RNButton
                    border={0}
                    center
                    onPress={onBack}
                    withoutFeedback
                    width={60}
                    height={40}
                    theme="outlined"
                    style={styles.backButton}
                >
                    <Icon Svg={ArrowLeft} width={24} height={24} />
                    <RNText text="Back" textSize="s" textWeight="500" lineHeight={32} />
                </RNButton>
                <View style={styles.titleContainer}>
                    {icon && (
                        <Icon
                            Svg={icon}
                            fill={globalStylesVariables.darkBlue}
                            width={20}
                            height={20}
                            style={{ justifySelf: 'center' }}
                        />
                    )}
                    {customIcon && (
                        <Animated.View entering={FadeIn.duration(150)}>{customIcon}</Animated.View>
                    )}
                    {title && (
                        <Animated.View entering={FadeIn.duration(150)}>
                            <RNText
                                text={title}
                                textWeight="700"
                                lineHeight={32}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            />
                        </Animated.View>
                    )}
                </View>
                <View style={styles.additionalAction}>{additionalAction && additionalAction}</View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    additionalAction: {
        position: 'absolute',
        right: '5%',
    },
    backButton: {
        justifyContent: 'flex-start',
        left: '4%',
        position: 'absolute',
    },
    innerView: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        gap: 0,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: '6%',
    },
    safeAreaView: {
        backgroundColor: globalStylesVariables.white,
    },
    titleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center',
        width: '75%',
    },
    view: {
        backgroundColor: globalStylesVariables.background,
        justifyContent: 'center',
        width: '100%',
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
