console.log("I initialize the server"); 

const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan'); 

const {v4 : uuidv4} = require('uuid'); 

const app = express(); 
const jsonParser = bodyParser.json(); 
const tokenManager = require('./middleware/tokenManager'); 

app.use(morgan('dev')); 
app.use(tokenManager); 

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
        return res.status(404).end();
    }

    return res.status(200).json(bookMarkResponse); 


});

app.post('/bookmark', jsonParser, (req, res) => {
    console.log("body", req.body); 
    let id = req.body.id;
    let title = req.body.title; 
    let desc = req.body.description; 
    let url = req.body.url; 
    let rate = req.body.rating; 

    console.log(typeof(rate));

    console.log(title, desc, url, rate); 

    if(id)
    {
        res.statusMessage = "The 'id' parameter must not be included on the body";
        return res.status(406).end(); 
    }

    if(!title || !desc || !url || !rate)
    {
        res.statusMessage = "All parameters (except 'Id') must be sent on the body request";
        return res.status(406).end(); 
    }
    id = uuidv4();

    let newBookmark = {id, title, desc, url, rate}; 
    bookmarks.push(newBookmark); 
    return res.status(201).json(newBookmark); 
});  

app.delete('/bookmark/:id', (req, res) =>{
    let id = req.params.id; 
    console.log(id); 


    let itemToRemove = -1;
    
    itemToRemove = bookmarks.findIndex( ( mark ) => {
        console.log("This is the id of the mark");
        console.log(mark.id); 

        if( mark.id === id ){
            return true;
        }
    });

        console.log("Im out of the findindex"); 
        console.log(itemToRemove); 

     if( itemToRemove < 0 ){
            res.statusMessage = "That 'id' was not found in the bookmarks.";
            return res.status( 404 ).end();
        }
    
       bookmarks.splice( itemToRemove, 1 );
        return res.status( 200 ).end();
});

app.patch('/bookmark/:id', jsonParser, (req, res)=>{
    let paramId = req.params.id; 
    let bodyId = req.body.id; 
    let title = req.body.title; 
    let description = req.body.description; 
    let url = req.body.url; 
    let rate = req.body.rating; 



    console.log(req.body); 
    if(!bodyId)
    {
        res.statusMessage = "You must send the 'id' parameter in the body as well ";
        return res.status(406).end(); 
    }

    if(paramId != bodyId)
    {
        res.statusMessage = "The 'id' parameter sent on the url is different than the 'id' on the body";
        return res.status(409).end(); 
    }
    
 

    let itemToPatch = -1; 

    itemToPatch = bookmarks.findIndex( (mark) => {
        if( mark.id === paramId ){
            return true;
        }
    }); 

    if( itemToPatch < 0 ){
        res.statusMessage = "That 'id' was not found in the bookmarks.";
        return res.status( 404 ).end();
    }

    if(title)
    {
        bookmarks[itemToPatch].title = title;
    }
    if(description)
    {
        bookmarks[itemToPatch].description = description;
    }
    if(url)
    {
        bookmarks[itemToPatch].url = url;
    }
    if(rate)
    {
        bookmarks[itemToPatch].rating = rate;
    }

    return res.status(202).json(bookmarks[itemToPatch]); 
});

app.listen(8080, ()=>{
    console.log("Now Im listening i standalone mode port 8080");
});


///bookmark?title=value