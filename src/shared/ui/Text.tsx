import {
    Dimensions, Platform, StyleSheet, Text,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { useCallback } from 'react';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';

export type TextSize = 'm' | 'l' | 's' | 'x' | 'xl' | 'xxl' | 'xs';
type Type = 'success' | 'warn' | 'error' | 'default' | 'defaultSecondary' | 'action';
const { width } = Dimensions.get('window');

interface RNTextProps extends TextStyle {
    text: string;
    textWeight?: '300' | '400' | '700' | '600' | '500';
    type?: Type;
    bold?: boolean;
    center?: boolean;
    textSize?: TextSize;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    lineHeight?: number;
    withOpacity?: boolean;
    uppercase?: boolean;
    ellipsizeMode?: 'middle' | 'head' | 'tail' | 'clip' | undefined;
    onPress?: () => void;
}

const size: Record<TextSize, number> = width <= 375
    ? {
        xs: 11,
        x: 12,
        s: 14,
        m: 16,
        l: 20,
        xl: 27,
        xxl: 34,
    }
    : {
        xs: 12,
        x: 13,
        s: 15,
        m: 17,
        l: 21,
        xl: 28,
        xxl: 36,
    };

const typeColor: Record<Type, string> = {
    default: globalStylesVariables.darkBlue,
    defaultSecondary: globalStylesVariables.white,
    action: globalStylesVariables.blueSecondary,
    error: 'tomato',
    warn: globalStylesVariables.warning,
    success: globalStylesVariables.success,
};

export const RNText = (props: RNTextProps) => {
    const {
        textSize = 'm',
        center = false,
        textWeight = '400',
        style,
        text,
        type = 'default',
        numberOfLines = undefined,
        lineHeight = 30,
        withOpacity = false,
        ellipsizeMode = undefined,
        uppercase = false,
        onPress,
        ...otherProps
    } = props;

    const defineWeightAndFont = useCallback((): string => {
        const isAndroid = Platform.OS === 'android';

        switch (textWeight) {
        case '300':
            return 'Montserrat-Light';
        case '400':
            return 'Montserrat-Regular';
        case '500':
            return 'Montserrat-Medium';
        case '600':
            return 'Montserrat-SemiBold';
        case '700':
            return 'Montserrat-Bold';
        default:
            return '';
        }
    }, [textWeight]);

    const styles = StyleSheet.create({
        text: {
            color: typeColor[type],
            fontFamily: defineWeightAndFont(),
            fontSize: size[textSize],
            lineHeight,
            opacity: withOpacity ? 0.7 : 1,
            textAlign: center ? 'center' : 'auto',
            textTransform: uppercase ? 'uppercase' : 'none',
        },
    });

    return (
        <Text
            style={[styles.text, style]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            maxFontSizeMultiplier={1.3}
            {...otherProps}
            onPress={onPress}
        >
            {text}
        </Text>
    );
};
