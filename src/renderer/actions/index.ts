import { SearchAction } from './searchActions';

export type RootActions = SearchAction[keyof SearchAction];
