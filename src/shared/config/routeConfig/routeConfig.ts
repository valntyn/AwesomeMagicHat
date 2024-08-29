import { ComponentType } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { CharacterDetails } from '@/screens/CharacterDetails';

export enum AppRouterEnum {
    CHARACTER_DETAILS = 'CharacterDetails',
}

export type RootStackParamList = {
    CharacterDetails: { studentId: string; readonly: boolean };
};

export interface RouteParams {
    name: keyof RootStackParamList;
    component: ComponentType;
    showHeader?: boolean;
    presentation?: StackNavigationOptions['presentation'];
}

export const RoutePath: Record<AppRouterEnum, keyof RootStackParamList> = {
    [AppRouterEnum.CHARACTER_DETAILS]: 'CharacterDetails',
};

export const routeConfig: Record<AppRouterEnum, RouteParams> = {
    [AppRouterEnum.CHARACTER_DETAILS]: {
        name: RoutePath.CharacterDetails,
        component: CharacterDetails,
    },
};
