import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables.ts';

interface SafeAreaTopProps {
    style?: StyleProp<ViewStyle>;
    without?: boolean;
    children: ReactNode;
}

export const SafeAreaTop = ({ children, style, without = false }: SafeAreaTopProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                {
                    paddingTop: without ? 0 : insets.top,
                    backgroundColor: globalStylesVariables.background,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};
