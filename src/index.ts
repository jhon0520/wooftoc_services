import App from './app';
import database from './database';

// Conec to DataBase
database();

const app = new App();
app.start();