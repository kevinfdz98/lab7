
const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653"; 


function addBookmarks(){
    document.querySelector('.listBookmarks').innerHTML = '';
    let url = 'http://localhost:8080/bookmarks'; 
    let settings = {
        method : 'GET', 
        headers : {
            authorization : `Bearer ${API_TOKEN}`
        }
    }

    fetch(url, settings)
            .then(response=>{
                if(response.ok){
                    return response.json(); 
                }  
                throw new Error(response.statusText);
            })
            .then(responseJSON=>{
                console.log(responseJSON)
                responseJSON.forEach(element => {
                    document.querySelector('.listBookmarks').innerHTML += 
                    `<div class="bookmark">
                            <ul>
                                <li>${element.title}</li>
                                <li>${element.url}</li>
                                <li>${element.id}</li>
                                <hr>
                            </ul>
                        <div>
                    `
                    
                });
            })
            .catch(err => {
                alert(err.message);
                console.log(err.message); 
            })
            

    //document.querySelector('.listBookmarks')
}; 

function postBookmark(){
    console.log("Post bookmark works")
    let url = 'http://localhost:8080/bookmark'; 
    let titleP = document.getElementById('title').value; 
    let descriptionP = document.getElementById('description').value; 
    let urlBody = document.getElementById('url').value; 
    let ratingP= document.getElementById('rating').value;
    ratingP = Number(ratingP); 

    let data = {
            "title" : "titleP",
            "description" : "descriptionP", 
            "url" : "urlBody", 
            "rating" : ratingP
    }

    let settings = {
        method : 'POST',
        headers : {
            authorization : `Bearer ${API_TOKEN}`
        },
        body : JSON.stringify( data )
    }

    console.log(settings); 

    fetch(url, settings)
            .then(response=>{
                if(response.ok){
                    return response.json(); 
                }  
                throw new Error(response.statusText);
            })
            .then(responseJSON=>{
                console.log(responseJSON);
                alert("Post completed")
            })
            .catch(err => {
                alert(err.message);
                console.log(err.message); 
            })


}

function patchBookmark(){
    console.log("Patch bookmark works")
    let idPatch = document.getElementById('idPatch').value;
    let url = `http://localhost:8080/bookmark/${idPatch}`; 

    let titleP = document.getElementById('titleU').value; 
    let descriptionP = document.getElementById('descriptionU').value; 
    let urlBody = document.getElementById('urlU').value; 
    let ratingP= document.getElementById('ratingU').value;
    ratingP = Number(ratingP); 

    let data = {
        "id" : idPatch,
        "title" : "titleP",
        "description" : "descriptionP", 
        "url" : "urlBody", 
        "rating" : ratingP
}

let settings = {
    method : 'PATCH',
    headers : {
        authorization : `Bearer ${API_TOKEN}`
    },
    body : JSON.stringify( data )
}

fetch(url, settings)
.then(response=>{
    if(response.ok){
        return response.json(); 
    }  
    throw new Error(response.statusText);
})
.then(responseJSON=>{
    console.log(responseJSON);
    alert("Patch completed")
})
.catch(err => {
    alert(err.message);
    console.log(err.message); 
})

}

function deleteBookmark(){
    console.log("Delete bookmark works"); 
    let idDelete = document.getElementById('idDelete').value;

    let url = `http://localhost:8080/bookmark/${idDelete}`; 
    let settings = {
        method : 'DELETE', 
        headers : {
            authorization : `Bearer ${API_TOKEN}`
        }
    }

    fetch(url, settings)
            .then(response=>{
                if(response.ok){
                    return response.ok; 
                }  
                throw new Error(response.statusText);
            })
            .then(res=>{
                alert("Deleted succesfully");
            })
            .catch(err => {
                alert(err.message);
                console.log(err.message); 
            })

            addBookmarks();



}

function searchBookmark(){
    console.log("Search bookmark works")
    let title = document.getElementById('titleSearch').value;
    console.log(title); 
    let url = `http://localhost:8080/bookmark?title=${title}`; 

    let settings = {
        method : 'GET', 
        headers : {
            authorization : `Bearer ${API_TOKEN}`
        }
    }

    fetch(url, settings)
            .then(response=>{
                if(response.ok){
                    return response.json(); 
                }  
                throw new Error(response.statusText);
            })
            .then(responseJSON=>{
                console.log(responseJSON);
                responseJSON.forEach(element => {
                    document.querySelector('.listBookmarksTitle').innerHTML += 
                    `<div class="bookmark">
                            <ul>
                                <li>${element.title}</li>
                                <li>${element.url}</li>
                                <li>${element.id}</li>
                                <hr>
                            </ul>
                        <div>
                    `
                })
            })
            .catch(err => {
                alert(err.message);
                console.log(err.message); 
            })

}





function observer(){
        document.querySelector('.newBookmark').addEventListener('click',(event)=>{
            event.preventDefault(); 
            postBookmark(); 
        }); 

        document.querySelector('.deleteBookmark').addEventListener('click',(event)=>{
            event.preventDefault(); 
            deleteBookmark(); 
        }); 
        document.querySelector('.patchBookmark').addEventListener('click',(event)=>{
            event.preventDefault(); 
            patchBookmark(); 
        }); 

        document.querySelector('.searchBookmarks').addEventListener('click',(event)=>{
            event.preventDefault(); 
            searchBookmark(); 
        }); 


}

function init(){
    addBookmarks(); 
    observer(); 
}

init(); 