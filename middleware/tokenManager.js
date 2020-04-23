
const apiToken = "2abbf7c3-245b-404f-9473-ade729ed4653"; 

function tokenManager(req, res, next){
    console.log("Im in the token Manager"); 
    console.log(req.headers); 
    let flag = [0,0,0]; 

    let authorizationToken = req.headers.authorization; 
    if(authorizationToken){flag[0] = 1}
    console.log(authorizationToken); 

    let test = 'book-api-key'; 
    let bookApiToken = req.headers['book-api-key']; 
    if(bookApiToken){flag[1] = 1}
    console.log(bookApiToken); 

    let paramToken = req.query.apiKey; 
    if(paramToken){flag[2] = 1}
    console.log(paramToken); 

    console.log(req.headers); 

    if(!authorizationToken && !bookApiToken && !paramToken)
    {
        res.statusMessage = "You must send the validation token"; 
        return res.status(401).end();
    }

   if( flag[0] == 1 && authorizationToken !== `Bearer ${apiToken}`)
    {
        res.statusMessage = "The token is not valid"; 
        return res.status(401).end();
    }

    if( flag[1] == 1 && bookApiToken !== apiToken)
    {
        res.statusMessage = "The token is not valid"; 
        return res.status(401).end();
    }

    if( flag[2] == 1 && paramToken !== apiToken)
    {
        res.statusMessage = "The token is not valid"; 
        return res.status(401).end();
    }
    

    next(); 
};

module.exports = tokenManager; 
