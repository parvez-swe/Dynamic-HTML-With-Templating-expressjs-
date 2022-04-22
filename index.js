const express = require('express');
// const { use } = require('express/lib/application');
const app = express();
const path = require('path');
const redditData = require('./data.json');
console.log(redditData);


app.set("view engine","ejs");
app.set('views', path.join(__dirname,'/views'));
// app.set('public', path.join(__dirname,'/public'));

// for static file like css,js etc. if i use it I dont have use this folder when need the path
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req, res) => {
      res.render('home');
      
});

app.get('/r/:subreddit',(req, res)=>{
      const {subreddit} = req.params;
      const data = redditData[subreddit];
      console.log(data);
      if(data){
      //subreddit for the page //...data for rend data as object and as we can access by type:<% name %> <% description %> etc.,
      res.render("subreddit",{...data}); 
      }else{
        res.render('notfound',{subreddit})    
      }
});

app.get('/cats',(req,res)=>{
      const cats = [
            'blue','Rocket','Monty'
      ] 
      res.render('cats',{cats})
})

app.listen(4200,()=>{
      console.log('Hi Im listening');
})