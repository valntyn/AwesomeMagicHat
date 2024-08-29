import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';

const TranslateY = Animated.createAnimatedComponent(LinearGradient);

const AnimatedGradient = ({
    colors,
    style,
    time = 400,
}: {
    colors: string[];
    style: any;
    time?: number;
}) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: time,
                    useNativeDriver: false,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: time,
                    useNativeDriver: false,
                }),
            ]),
        ).start();
    }, [animation, time]);

    return (
        <>
            <TranslateY
                colors={colors}
                style={[style, { opacity: animation }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <TranslateY
                colors={colors.reverse()}
                style={[
                    style,
                    {
                        opacity: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        }),
                    },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </>
    );
};

interface SkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
}

export const Skeleton = ({
    width = '100%',
    height = 50,
    style,
    borderRadius = 8,
}: SkeletonProps) => {
    const colors = [
        globalStylesVariables.background,
        globalStylesVariables.white,
        globalStylesVariables.background,
    ];
    return (
        // @ts-ignore wrong rn types
        <View style={[styles.skeleton, { width, height, borderRadius }, style]}>
            <AnimatedGradient colors={colors} style={StyleSheet.absoluteFill} />
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#E0E0E0',
        borderColor: globalStylesVariables.border,
        borderWidth: 0.4,
        overflow: 'hidden',
        position: 'relative',
    },
});
