import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/src/types';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';
import { Icon } from '@/shared/ui/Icon';
import { TabRouteParams } from '@/shared/config/routeConfig/tabRouterConfig';
import { RNText } from '@/shared/ui/Text';

interface TabButtonProps extends BottomTabBarButtonProps {
    item: TabRouteParams;
}

export const TabButton = (props: TabButtonProps) => {
    const { item, accessibilityState, onPress } = props;
    const focused = accessibilityState?.selected;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={1}>
            <View style={styles.iconBox}>
                <Icon
                    Svg={item.icon}
                    fill={
                        focused
                            ? globalStylesVariables.blueSecondary
                            : globalStylesVariables.darkBlue
                    }
                    width={20}
                    height={20}
                />
                <RNText
                    text={item.textLabel}
                    style={{
                        fontSize: 10,
                        color: focused
                            ? globalStylesVariables.blueSecondary
                            : globalStylesVariables.darkBlue,
                    }}
                    textWeight="600"
                    lineHeight={28}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    iconBox: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
});
