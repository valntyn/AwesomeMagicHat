import React, { memo, ReactNode } from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { runOnUI, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RNText } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import ArrowLeft from '@/shared/assets/icons/arrow-left.svg';
import { Icon } from '@/shared/ui/Icon';
import { useRNAccordion } from '@/shared/hooks/useRNAccordion';

interface AccordionCardProps {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
    firstLabel: string;
    secondLabel?: ReactNode;
    additionalContent?: ReactNode;
}

export const AccordionCard = memo((props: AccordionCardProps) => {
    const {
        style, children, firstLabel, secondLabel, additionalContent,
    } = props;
    const {
        animatedHeightStyle, animatedRef, isOpened, toggle,
    } = useRNAccordion();

    const animatedArrowIcon = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: withTiming(`${isOpened.value ? 270 : 180}deg`, {
                    duration: 300,
                }),
            },
        ],
    }));

    return (
        <Card style={[style, styles.view]} disableOpacityOnPress>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.touchable}
                    onPress={() => runOnUI(toggle)()}
                >
                    <RNText
                        text={firstLabel}
                        textWeight="600"
                        lineHeight={18}
                        numberOfLines={2}
                        style={{ width: 180 }}
                    />
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        {secondLabel && secondLabel}
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            right: 24,
                            justifyContent: 'center',
                        }}
                    >
                        {additionalContent && additionalContent}
                    </View>
                    <Animated.View style={animatedArrowIcon}>
                        <Icon Svg={ArrowLeft} width={24} height={24} />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={animatedHeightStyle}>
                    <View style={styles.absolutePosition}>
                        <View ref={animatedRef} collapsable={false}>
                            {children}
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Card>
    );
});

const styles = StyleSheet.create({
    absolutePosition: {
        left: 0,
        position: 'absolute',
        top: 0,
    },
    container: {
        overflow: 'hidden',
    },
    touchable: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    view: {},
});
