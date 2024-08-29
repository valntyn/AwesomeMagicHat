import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/config/routeConfig/routeConfig';
import { RootStackParamList as TabRootStackParamList } from '@/shared/config/routeConfig/tabRouterConfig';

export const useAppNavigation = () => {
    return useNavigation<NavigationProp<RootStackParamList>>();
};

export const useTabAppNavigation = () => {
    return useNavigation<NavigationProp<TabRootStackParamList>>();
};
