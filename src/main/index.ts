import app from './app';
import accessor from './app/accessor';

let accessor: Accessor | undefined;
let args: object | undefined;

// Start the application
const knowledgebase = new App(accessor, args);
knowledgebase.init();
