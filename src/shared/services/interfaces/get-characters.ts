import { CharacterHouse } from '@/shared/services/model/character/house';

export interface GetCharacters {
    id: string;
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: CharacterHouse | null;
    dateOfBirth: string | null;
    yearOfBirth: number | null;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: object;
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    alternate_actors: string[];
    alive: boolean;
    image: string;
}
