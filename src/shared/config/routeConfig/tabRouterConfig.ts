import { ComponentType } from 'react';
import { Home } from '@/screens/Home';
import { Students } from '@/screens/Students';
import { IconProps } from '@/shared/ui/Icon';

import HomeIcon from '@/shared/assets/icons/house-solid.svg';
import ListIcon from '@/shared/assets/icons/list-solid.svg';

export enum tabRouterEnum {
    HOME = 'Home',
    CHARACTERS = 'Characters',
}

export type RootStackParamList = {
    Home: { studentId?: string };
    Characters: undefined;
};

export interface TabRouteParams {
    name: keyof RootStackParamList;
    component: ComponentType;
    icon: IconProps['Svg'];
    textLabel: string;
    unmountOnBlur?: boolean;
    defaultHeader?: boolean;
}

export const RoutePath: Record<tabRouterEnum, keyof RootStackParamList> = {
    [tabRouterEnum.HOME]: 'Home',
    [tabRouterEnum.CHARACTERS]: 'Characters',
};

export const tabRouteConfig: Record<tabRouterEnum, TabRouteParams> = {
    [tabRouterEnum.HOME]: {
        name: RoutePath.Home,
        component: Home,
        textLabel: 'Home',
        icon: HomeIcon,
        unmountOnBlur: false,
    },
    [tabRouterEnum.CHARACTERS]: {
        name: RoutePath.Characters,
        component: Students,
        textLabel: 'List',
        icon: ListIcon,
        unmountOnBlur: true,
    },
};
