import {
    measure,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';

export const useRNAccordion = ({ defaultOpen = false }: { defaultOpen?: boolean } = {}) => {
    const animatedRef = useAnimatedRef<View>();
    const isOpened = useSharedValue(false);
    const height = useSharedValue(0);
    const animatedHeightStyle = useAnimatedStyle(() => ({
        height: withTiming(height.value),
    }));

    const toggle = () => {
        'worklet';

        height.value = !height.value ? Number(measure(animatedRef)?.height ?? 0) : 0;

        isOpened.value = !isOpened.value;
    };

    return {
        animatedRef,
        isOpened,
        animatedHeightStyle,
        toggle,
    };
};
