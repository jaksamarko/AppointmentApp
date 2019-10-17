const express = require('express');
const app = express();

app.use("/", express.static(__dirname + "/public"));

app.get('/',(req,res)=>{
    res.redirect('index.html')
});
app.get('/index.html',(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
});
app.get('/about.html',(req,res)=>{
    res.sendFile('about.html',{root:__dirname});
});
app.get('/info.html',(req,res)=>{
    res.sendFile('info.html',{root:__dirname});
});

app.listen(3000, () => console.log(`Test running on port 3000!`));