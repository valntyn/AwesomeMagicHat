import { memo, ReactNode } from 'react';
import {
    StatusBar, StyleProp, StyleSheet, ViewStyle,
} from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';

interface ScreenProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    edges?: Edges;
    type?: 'initial' | 'secondary';
}

export const Screen = memo((props: ScreenProps) => {
    const {
        children, style, edges = ['top', 'left', 'right', 'bottom'], type = 'initial',
    } = props;

    return (
        <SafeAreaView
            style={[
                style,
                styles.view,
                {
                    backgroundColor:
                        type === 'initial'
                            ? globalStylesVariables.background
                            : globalStylesVariables.white,
                },
            ]}
            edges={edges}
        >
            <StatusBar barStyle="default" />
            {children}
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
