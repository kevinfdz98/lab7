console.log("I initialize the server"); 

const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan'); 

const {v4 : uuidv4} = require('uuid'); 

const app = express(); 
const jsonParser = bodyParser.json(); 

app.use(morgan('dev')); 

console.log('FInish initializing constants'); 

//import {v4 as uuidv4} from uuid; 

/*let test = uuidv4(); 
console.log(test); */


/*const buffer = new Array();
uuidv4(null, buffer, 0);
*/

/*const post = {
    id : uuidv4(), 
    title : String, 
    description : String, 
    url : String,
    rating : Number
};*/




let bookmarks = [
    {
        id : uuidv4(),
        title : "Correo Electrónico",
        description : "Bandeja de entrada de outlook", 
        url : 'https://outlook.office.com/mail/inbox',
        rating : 8
    }, 
    {
        id : uuidv4(),
        title : "Youtube",
        description : "Inicio del buscador de videos", 
        url : 'https://www.youtube.com/?hl=es-419&gl=MX',
        rating : 10
    }, 
    {
        id : uuidv4(),
        title : "Youtube",
        description : "Sitio web de la clase de desarrollo web", 
        url : 'https://sites.google.com/site/wadfeb2/',
        rating : 9
    }, 
    {
        id : uuidv4(),
        title : "Blackboard",
        description : "Pagina de inicio de la plataforma escolar", 
        url : 'https://miscursos.tec.mx/ultra',
        rating : 7
    }
]

console.log(bookmarks); 



app.get('/bookmarks', (req, res)=>{
    return res.status( 200 ).json(bookmarks); 
});

app.get('/bookmark/', (req, res)=>{
    console.log(req.query); 

    let title = req.query.title; 
   

    if(!title)
    {
        res.statusMessage = "Please include the 'Title' you are lookin for"; 
        return res.status(406).end(); 
    }

    let bookMarkResponse = []; 

    
    bookmarks.find( ( bookmark ) =>{
        if(bookmark.title === title)
        {
            bookMarkResponse.push(bookmark); 
        }
    }); 

    if( !bookMarkResponse)
    {
        res.statusMessage = "Sorry, the bookmark you are looking for is not here"; 
        return res.status(404).end()
    }

    return res.status(200).json(bookMarkResponse); 


});


app.listen(8080, ()=>{
    console.log("Now Im listening i standalone mode port 8080");
});


///bookmark?title=value