const mongoose = require('mongoose'); 

const bookmarksSchema = mongoose.Schema({
    id : {
        type : String, 
        unique : true

    },

    title : {
        type : String
    },

    description : {
        type : String

    },
    url : {
        type : String

    }, 
    rating : {
        type : Number
    }

}); 

const bookmarksCollection = mongoose.model('bookmarksDB', bookmarksSchema); 

const bookmarksQueries = {
    createBookmark : function( newBookmark ){
        return bookmarksCollection
                .create( newBookmark )
                .then( createdBookmark => {
                        return createdBookmark; 
                })
                .catch( err => {
                    return err; 
                }) 
    },

    getBookmarks : function(){
        return bookmarksCollection
                .find()
                .then( gettingCollection => {
                        return gettingCollection; 
                })
                .catch(err => {
                    return err; 
                })
    }, 

    getBookmarksByTitle : function(searchTitle){
        return bookmarksCollection
        .find({'title' : searchTitle })
        .then( gettingFiles => {
                    return gettingFiles
        })
        .catch(err => {
            return err; 
        })
    }, 

    
    getBookmarkById : function(idToFind){
        return bookmarksCollection
        .find({'id' : idToFind })
        .then( gettingFiles => {
                    return gettingFiles
        })
        .catch(err => {
            return err; 
        })
    },

    removeElementById : function(idToRemove){
        return bookmarksCollection
        .remove({'id' : idToRemove})
        .then( removed => {
                return removed
        })
        .catch(err => {
            return err; 
        })
    },
    
   patchElementById : function (id, params) {
    return bookmarksCollection
      .findOneAndUpdate({ id }, params, { new: true })
      .then((updatedBookmark) => {
        return updatedBookmark;
      })
      .catch((err) => {
        return err;
      });
  }
}




module.exports = { bookmarksQueries }; 