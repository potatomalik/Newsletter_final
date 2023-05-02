const express = require('express');
const app=express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const request = require('request');
const https = require('https');


app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});

app.post('/',function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.mail;
    
    const data={
        members:[
            {
                email_address:email,
                status: 'subscribed',
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url='https://us8.api.mailchimp.com/3.0/lists/84a5225c74';
    const options= {
        method:'POST',
        auth:'malik4:151b9078acfd31375679746b4df93b56-us8'
    };
    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
                res.sendFile(__dirname+'/succes.html');
        }else{
                res.sendFile(__dirname+'/failure.html');
        }
        // response.on('data',function(data){
        //     console.log(JSON.parse(data));
        // });
    });
    request.write(jsonData);
    request.end();
});

app.post('/failure',function(req,res){
    res.redirect('/');
});


app.listen(process.env.PORT || 3000,function(){
    console.log('Server running on port 3000.');
});

//151b9078acfd31375679746b4df93b56-us8

//84a5225c74