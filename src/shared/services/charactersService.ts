import { asyncThunkCreator } from '../helpers/asyncThunkCreator';
import { GetCharacters } from '@/shared/services/interfaces/get-characters';

const serviceUrl = 'characters';

export const getCharactersStudents = asyncThunkCreator<void, GetCharacters[]>(
    'characterService/getCharactersStudents',
    `${serviceUrl}/students`,
    'get',
);
