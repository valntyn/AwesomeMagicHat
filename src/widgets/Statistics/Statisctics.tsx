import { memo } from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { RNText } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';

interface StatiscticsProps {
    data: { label: string; value: number }[];
    isLoading: boolean;
    style?: StyleProp<ViewStyle>;
}

export const Statisctics = memo((props: StatiscticsProps) => {
    const { style, data, isLoading } = props;

    return (
        <View style={[style, styles.view]}>
            {data.map((item, i) => (
                <Card key={i} disableOpacityOnPress style={styles.card} type="secondary">
                    <RNText text={item.value.toString()} textWeight="600" textSize="l" />
                    <RNText text={item.label} textWeight="500" textSize="s" />
                </Card>
            ))}
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        borderColor: globalStylesVariables.border,
        borderWidth: 1,
        flex: 1,
        height: 80,
        justifyContent: 'center',
    },
    view: { gap: 24 },
});
