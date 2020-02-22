import App from './app';
import { Accessor } from './app/accessor';

const appEnv: object = {};
const accessor: Accessor = new Accessor(appEnv);
//let accessor: Accessor;
let args: object | undefined;

// Start the application
const knowledgebase = new App(accessor, args);
knowledgebase.init();
