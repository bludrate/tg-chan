import express from 'express';
//import expressStaticGzip from 'express-static-gzip';

// we'll talk about this in a minute:
import serverRenderer from './middleware/renderer';
import './pages';

const PORT = 3000;
import path from 'path';

// initialize the application and create the routes
const app = express();
const router = express.Router();

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'pages'),
    { maxAge: '30d',
      index: 'index.html',
      setHeaders: function( res ) {
        //res.set('content-encoding', 'gzip');
        //console.log(res);
        //res.set('content-type', 'text/html');
      }
    },
));

// root (/) should always serve our server rendered page
router.use('^/$', serverRenderer);

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

router.use('*', serverRenderer);

// tell the app to use the above rules
app.use(router);

// start the app
app.listen(PORT, (error) => {
    if (error) {
        return console.log('something bad happened', error);
    }

    console.log("listening on " + PORT + "...");
});
