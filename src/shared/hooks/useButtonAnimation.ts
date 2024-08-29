import {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export const useButtonAnimation = (colors: string[] = ['#fff', '#cfd4e2']) => {
    const pressed = useSharedValue(0);

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(pressed.value, [0, 1], colors, 'RGB');
        return { backgroundColor };
    }, []);

    const onPressIn = () => {
        pressed.value = withTiming(1);
    };

    const onPressOut = () => {
        pressed.value = withTiming(0);
    };

    return { onPressIn, onPressOut, animatedBackgroundStyle };
};
