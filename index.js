import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import routes from './routes.js';

const app = express();

//Db setup
try {
    const uri = 'mongodb://localhost:27017/tech-store' // CHANGE db name!
    await mongoose.connect(uri);

    console.log('DB connected!');
} catch (err) {
    console.error('Cannot connect to db!');
    console.log(err.message);
}


//Handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

// Start express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));