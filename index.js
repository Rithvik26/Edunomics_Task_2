const express= require('express');
const bodyparser = require('body-parser');



const app= express();
const port = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

const values = [{Hop_one: 0,cor:0, noh: 0, cordinates: []}]


app.get('/',(_, res) => {
    res.send('Hello World');
});
//This get API is used to give full list of past calculations as json data-get
app.get('/values', (_,res) => {
    res.json({ ok: true, values });
});

//This post API is used to give an input height i.e the starting height from where the ball is dropped and find out the number of hops the ball makes and coordinates to plot the graph and store it in json data-set
app.post('/giveinput', (req,res) => {
    const {Hop_one,cor} = req.body;
    var cord=[]
    if (Hop_one && cor) {
        var c =0;
        var x= 0;
        var y=parseInt(Hop_one);
        
        cord.push(x);
        
        cord.push(y);
        //considering y coordinate upto 2 decimals
        while(parseFloat(y.toFixed(2))>0)
        {
            x+=0.5;
            
        cord.push(x);
        
        cord.push(0);
            c++;
              y=y*(cor);

              x+=0.5;
        //Every two indices of the cord list indicate a coordinate on the graph to plot.
        cord.push(x);
        let we=y
        cord.push(parseFloat(we.toFixed(2)));
        }
        values.push({Hop_one,cor,c,cord});
        //to return the new list of users
        res.json({ok : true, values});
    }
});

app.listen(port, () => {
    console.log(`Listening on port:  ${port}...`)
});
