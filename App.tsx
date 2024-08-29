import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StoreProvider } from '@/app/providers/store';
import AppRouter from '@/app/providers/navigation/AppRouter';
import 'react-native-devsettings';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StoreProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <AppRouter />
                    </GestureHandlerRootView>
                </StoreProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
