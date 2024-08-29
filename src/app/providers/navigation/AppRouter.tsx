import {
    memo, useCallback,
} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from './BottomNavigation';
import { routeConfig, RouteParams } from '@/shared/config/routeConfig/routeConfig';

const Stack = createStackNavigator();

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: RouteParams) => {
        const {
            name,
            component,
            showHeader = false,
            presentation = 'card',
        } = route;

        return (
            <Stack.Screen
                name={name}
                component={component}
                key={name}
                options={{
                    headerShown: showHeader,
                    presentation,
                }}
            />
        );
    }, []);

    return (
        <Stack.Navigator initialRouteName="root">
            <Stack.Screen
                name="root"
                component={BottomNavigation}
                options={{ headerShown: false }}
            />
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Stack.Navigator>
    );
};

export default memo(AppRouter);
