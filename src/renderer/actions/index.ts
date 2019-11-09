import { SearchAction } from './searchActions';
import { EditorAction } from './editorActions';

export type RootActions = SearchAction[keyof SearchAction] | EditorAction[keyof EditorAction];
