import { memo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import {
    tabRouteConfig,
    TabRouteParams,
} from '@/shared/config/routeConfig/tabRouterConfig';
import { TabButton } from './ui/TabButton';
import { TabHeader } from './ui/TabHeader';

const Tab = createBottomTabNavigator();

const tabShadow = Platform.select({
    ios: {
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
    },
    android: { elevation: 2 },
});

export const BottomNavigation = memo(() => {
    const renderWithWrapper = useCallback(
        (route: TabRouteParams) => {
            const {
                component,
                name,
                unmountOnBlur = false,
            } = route;

            return (
                <Tab.Screen
                    name={name}
                    component={component}
                    key={name}
                    options={{
                        tabBarHideOnKeyboard: Platform.OS === 'android' ? true : undefined,
                        unmountOnBlur,
                        tabBarButton: (props) => <TabButton item={route} {...props} />,
                        tabBarStyle: { height: 100, ...tabShadow },
                        header: () => {
                            return <TabHeader route={route} />;
                        },
                    }}
                />
            );
        },
        [],
    );

    return <Tab.Navigator>{Object.values(tabRouteConfig).map(renderWithWrapper)}</Tab.Navigator>;
});
