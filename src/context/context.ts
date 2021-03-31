import {createContext} from 'react';
import {IContext} from '../dataStructure';

export const Context = createContext<IContext>({} as IContext);
