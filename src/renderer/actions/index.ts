import { SearchAction } from './searchActions';
import { CreateAction } from './createActions';

export type RootActions = SearchAction[keyof SearchAction] | CreateAction[keyof CreateAction];
