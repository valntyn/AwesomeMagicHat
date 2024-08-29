import { ReactNode } from 'react';
import {
    DimensionValue,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';

type Theme = 'initial' | 'outlined' | 'warn' | 'secondary' | 'special';
type Size = 'm' | 'l';

interface RNButtonProps extends TouchableOpacityProps {
    children: ReactNode;
    theme?: Theme;
    disabled?: boolean;
    border?: number;
    fullWidth?: boolean;
    center?: boolean;
    width?: DimensionValue;
    height?: number;
    minHeight?: number;
    textSize?: Size;
    style?: StyleProp<ViewStyle>;
    withoutFeedback?: boolean;
    selected?: boolean;
    withHiddenBorder?: boolean;
}

export const bgColors: Record<Theme, string> = {
    initial: globalStylesVariables.bluePrimary,
    secondary: globalStylesVariables.white,
    special: globalStylesVariables.specialAction,
    outlined: 'transparent',
    warn: globalStylesVariables.white,
};

export const RNButton = (props: RNButtonProps) => {
    const {
        children,
        theme = 'initial',
        height = 20,
        width = 20,
        minHeight = 0,
        disabled = false,
        border = 16,
        fullWidth,
        textSize = 'm',
        center = false,
        onPress,
        style,
        withoutFeedback = false,
        selected = false,
        ...otherProps
    } = props;

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            backgroundColor: bgColors[theme],
            borderColor: 'transparent',
            borderRadius: border || 0,
            borderWidth: 1.5,
            justifyContent: 'center',
        },
        centerButton: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        disabledButton: {
            opacity: 0.5,
        },
        fullwidthButton: {
            width: '100%',
        },
        height: {
            height,
        },
        minHeight: {
            minHeight,
        },
        selectedButton: {
            borderColor: globalStylesVariables.bluePrimary,
            borderWidth: 1.5,
        },
        shadow: {
            ...Platform.select({
                ios: {
                    shadowColor: globalStylesVariables.darkBlue,
                    shadowOffset: { width: 0, height: 1.2 },
                    shadowOpacity: 0.18,
                    shadowRadius: 2.2,
                },
                android: {
                    elevation: 2,
                },
            }),
        },
        warnButton: {
            borderColor: '#d0d3d7',
            borderWidth: 1.5,
        },
        width: {
            width,
        },
    });

    const buttonStyles = [
        styles.button,
        !minHeight && styles.height,
        minHeight && styles.minHeight,
        styles.width,
        fullWidth && styles.fullwidthButton,
        center && styles.centerButton,
        disabled && styles.disabledButton,
        selected && styles.selectedButton,
        theme === 'warn' && styles.warnButton,
        theme === 'secondary' && styles.shadow,
    ];

    return (
        <TouchableOpacity
            style={[buttonStyles, style]}
            disabled={disabled}
            onPress={onPress}
            activeOpacity={withoutFeedback ? 1 : 0}
            {...otherProps}
        >
            {children}
        </TouchableOpacity>
    );
};
