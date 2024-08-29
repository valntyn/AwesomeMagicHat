import { memo, ReactNode } from 'react';
import {
    Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';
import { useButtonAnimation } from '@/shared/hooks/useButtonAnimation';

interface CardProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    type?: 'default' | 'secondary';
    background?: string;
    disableOpacityOnPress?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Card = memo((props: CardProps) => {
    const {
        children,
        style,
        type = 'default',
        background = globalStylesVariables.white,
        disableOpacityOnPress = false,
    } = props;
    const { onPressIn, onPressOut, animatedBackgroundStyle } = useButtonAnimation();
    const opacityOnPress = disableOpacityOnPress ? undefined : 1;

    let secondaryShadowStyle = {};

    if (type === 'secondary') {
        secondaryShadowStyle = Platform.OS === 'ios'
            ? {
                shadowColor: globalStylesVariables.darkBlue,
                shadowOffset: { width: 0, height: 1.2 },
                shadowOpacity: 0.18,
                shadowRadius: 2.2,
            }
            : { elevation: 2 };
    }

    if (!opacityOnPress) {
        return (
            <View
                needsOffscreenAlphaCompositing
                style={[style, styles.view, secondaryShadowStyle, { backgroundColor: background }]}
            >
                {children}
            </View>
        );
    }

    return (
        <AnimatedTouchableOpacity
            activeOpacity={opacityOnPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                style,
                styles.view,
                secondaryShadowStyle,
                { backgroundColor: background },
                animatedBackgroundStyle,
            ]}
        >
            {children}
        </AnimatedTouchableOpacity>
    );
});

const styles = StyleSheet.create({
    view: {
        borderRadius: 8,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.08)',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 12,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});
