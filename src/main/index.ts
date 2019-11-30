import App from './app';
import { Accessor } from './app/accessor';

let accessor: Accessor | undefined;
let args: object | undefined;

// Start the application
const knowledgebase = new App(accessor, args);
knowledgebase.init();
