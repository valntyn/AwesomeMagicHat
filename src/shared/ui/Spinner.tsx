import { memo, useRef } from 'react';
import LottieView from 'lottie-react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import spinner from '@/shared/assets/animations/spinner.json';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface AnimationProps {
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
}

export const Spinner = memo((props: AnimationProps) => {
    const { style, width = 20, height = 20 } = props;
    const animation = useRef<LottieView>(null);

    return (
        <View style={[style, styles.view]}>
            <AnimatedLottieView
                exiting={ZoomOut}
                autoPlay
                ref={animation}
                style={{
                    width,
                    height,
                }}
                source={spinner}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
    },
});
