import { CharacterHouse } from '@/shared/services/model/character/house.ts';

export const HOUSE_DATA: { name: CharacterHouse; image: any }[] = [
    {
        name: 'Gryffindor',
        image: require('@/shared/assets/png/Gryffindor-Logo.png'),
    },
    {
        name: 'Slytherin',
        image: require('@/shared/assets/png/Slytherin-Logo.png'),
    },
    {
        name: 'Ravenclaw',
        image: require('@/shared/assets/png/Ravenclaw-Logo.png'),
    },
    {
        name: 'Hufflepuff',
        image: require('@/shared/assets/png/Hufflepuff_Logo.png'),
    },
];
