console.log("I initialize the server"); 

const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const mongoose = require('mongoose'); 
const {bookmarksQueries} = require('./models/bookmarksModel'); 


const {v4 : uuidv4} = require('uuid'); 

const app = express(); 
const jsonParser = bodyParser.json(); 
const tokenManager = require('./middleware/tokenManager'); 

app.use(morgan('dev')); 
app.use(tokenManager); 

console.log('FInish initializing constants'); 


app.get('/bookmarks', (req, res)=>{
    bookmarksQueries
                    .getBookmarks()
                    .then(result => {
                        return res.status( 200 ).json(result); 
                    })
                    .catch(err => {
                        console.log("Im on the error display")
                        res.status = err; 
                        return res.status(500).end(); 
                    }); 
    
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

    
    /*bookmarks.find( ( bookmark ) =>{
        if(bookmark.title === title)
        {
            bookMarkResponse.push(bookmark); 
        }
    }); */

    bookmarksQueries
    .getBookmarksByTitle(title)
    .then(result => {
        console.log(result);
        if( result.length == 0)
    {
        res.statusMessage = "Sorry, the bookmark you are looking for is not here"; 
        return res.status(404).end();
    } 
        return res.status( 200 ).json(result); 
    })
    .catch(err => {
        console.log("Im on the error display")
        res.status = err; 
        return res.status(500).end(); 
    }); 



    /*if( !bookMarkResponse)
    {
        res.statusMessage = "Sorry, the bookmark you are looking for is not here"; 
        return res.status(404).end();
    }*/
});

app.post('/bookmark', jsonParser, (req, res) => {
    console.log("body", req.body); 
    let id = req.body.id;
    let title = req.body.title; 
    let description = req.body.description; 
    let url = req.body.url; 
    let rating = req.body.rating; 

    console.log(typeof(rating));

    if(id)
    {
        res.statusMessage = "The 'id' parameter must not be included on the body";
        return res.status(406).end(); 
    }

    if(!title || !description || !url || !rating)
    {
        res.statusMessage = "All parameters (except 'Id') must be sent on the body request";
        return res.status(406).end(); 
    }
    id = uuidv4();

    let newBookmark = {id, title, description, url, rating}; 
    console.log(newBookmark); 

    bookmarksQueries
                 .createBookmark( newBookmark )
                 .then( result => {
                     console.log("Im on the bookmakrPost")
                    return res.status(201).json(result);
                 })
                 .catch(err => {
                     console.log("Im on the error display")
                     res.status = err; 
                     return res.status(500).end(); 
                 }); 
});  

app.delete('/bookmark/:id', (req, res) =>{
    let id = req.params.id; 
    console.log(id); 

    bookmarksQueries
                    .removeElementById(id)
                    .then( result => {
                        return res.status( 200 ).end();
                    })
                    .catch(err => {
                        console.log("Im on the error display")
                        res.status = err; 
                        return res.status(500).end(); 
                    }); 


    /*let itemToRemove = -1;
    
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
    
       bookmarks.splice( itemToRemove, 1 );*/
});


app.patch('/bookmark/:id', jsonParser, (req, res)=>{
    let paramId = req.params.id; 
    let bodyId = req.body.id; 
    let title = req.body.title; 
    let description = req.body.description; 
    let url = req.body.url; 
    let rating = req.body.rating; 



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
    
    console.log("I evaluated the id's"); 


    /*let objectToPatch =  bookmarksQueries
                                         .getBookmarkById(paramId)
                                         .then( result => {
                                            return result;
                                        })
                                        .catch(err => {
                                            console.log("Im on the error display")
                                            return err;  
                                        }); 
    console.log("Aqui presento el objeto que quiero modificar "); 
    console.log(objectToPatch); */


let changes = "";

console.log("This is the empty string"); 
console.log(changes); 

    if(title)
    {
        if(changes.length > 1 ) {changes = changes.concat(',')}
        changes = changes.concat(`"title" : "${title}"`)
    }
    if(description)
    {
        if(changes.length > 1 ) {changes = changes.concat(',')}
        changes = changes.concat(`"description" : "${description}"`)
    }
    if(url)
    {
        if(changes.length > 1 ) { changes = changes.concat(',')}
        changes = changes.concat(`"url" : "${url}"`)
    }
    if(rating)
    {
        if(changes.length > 1 ) {changes = changes.concat(',')}
        changes = changes.concat(`"rating" : "${rating}"`)
    }
    console.log("Finished evalauting body of request"); 
    console.log(changes); 


    bookmarksQueries
                    .patchElementById(paramId, changes)
                    .then( updated => {
                        console.log(updated); 
                        return res.status(202).json(updated);
                    })
                    .catch( err => {
                        res.status = err; 
                        return res.status(500).end(); 
                    })
});

app.listen(8080, ()=>{
    console.log("Now Im listening i standalone mode port 8080");
    new Promise((resolve, reject) => {
        const settings = {
            useNewUrlParser : true, 
            useUnifiedTopology : true, 
            useCreateIndex : true
        }; 

        mongoose.connect('mongodb://localhost/bookmarksDB', settings, (err)=>{
            if (err){
                return reject(err); 
            }
            else {
                console.log("Database connected succesfully"); 
                return resolve(); 
            }
        } )
        .catch(err => {
            console.log(err); 
        })
    })
});


///bookmark?title=value