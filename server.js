var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var  buses = [];
var busesNextNum = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Welcome to the bus depot!!');
});

  // GET /buses
  app.get('/buses', function(req, res){
    var count = 0;
    for(var i=0; i<buses.length; i++)
    {
    count=i+1;
    }
    console.log(count);
    res.send(JSON.stringify(buses,null,null,10)+"\n At the bus park there: "+count+" buses");
    console.log('Method Get for /buses working');
  });

      // GET /buses/:num
      app.get('/buses/num', function(req, res){
        var busesNum = parseInt(req.buses.num, 10);
        var matchedbuses = _.findWhere(buses, {num: busesNum});

        if(matchedbuses){
          res.json(matchedbuses);
        }else{
          res.status(404).send();
        }
        console.log('Method Get for /buses/:id working');
      });
              // POST /buses
              app.post('/buses', function(req, res){
                var body = _.pick(req.body, 'name','type', 'number');

                if(!_.isString(body.name) || !_.isString(body.type) ||!_.isString(body.number) ||body.number.trim().length === 0){
                  return res.status(400).send();
                }
                body.num = busesNextNum++;
                buses.push(body);
                res.json(body);
                console.log('Method Post for /buses working');
              });
                    //Delete/buses/:num
                    app.delete('/buses/:num', function(req,res){
                      var busesNum = parseInt(req.params.num,10);
                      var matchedbuses = _.findWhere(buses, {num: busesNum});

                      if(!matchedbuses){
                        res.status(404).json("Attention!: You have already deleted buses with that num ");
                      }else{
                        buses = _.without(buses, matchedbuses);
                        res.json(matchedbuses);
                      }
                      console.log('Method Delete for /buses/:id working');
                    });

                      app.listen(PORT, function(){
                      console.log('Express listening on port ' + PORT + '!');
                      });
