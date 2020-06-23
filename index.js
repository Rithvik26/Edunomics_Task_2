const express= require('express');
const bodyparser = require('body-parser');



const app= express();
const port = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

const values = [{Hop_one: 0, noh: 0, cordinates: []}]


app.get('/',(_, res) => {
    res.send('Hello World');
});
//This API is used to send full list of users as json data-get
app.get('/values', (_,res) => {
    res.json({ ok: true, values });
});

//This API is used to Find out the number of hops and coordinates and store it in json data-set
app.post('/giveinput', (req,res) => {
    const {Hop_one} = req.body;
    var cord=[]
    if (Hop_one) {
        var c =0;
        var x= 0;
        var y=parseInt(Hop_one);
        let wq=`(${x},${y})`;
        cord.push(wq);
        while(y>0)
        {
            x+=0.5;
            let g=`(${x},0)`;
              
              cord.push(g)  
            c++;
              y=y/2
            
              x+=0.5;
            let r=`(${x},${y})`;
              cord.push(r)  
              
            
        }
        values.push({Hop_one,c,cord});
        //to return the new list of users
        res.json({ok : true, values});
    }
});

app.listen(port, () => {
    console.log(`Listening on port:  ${port}...`)
});