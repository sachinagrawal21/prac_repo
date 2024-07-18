const express = require("express");

const app = express();

var users = [{
  name : "sachin",
  kidneys : [{
    healthy : false
  }]
}];

app.get("/", function(req,res){

  const kid = users[0].kidneys;
  const noofkid = kid.length;

  let noofhealthykid = 0;
  for(let i=0;i<noofkid;i++)
  {
    if(kid[i].healthy)
      noofhealthykid ++;
  }

  noofunhealthykid = noofkid - noofhealthykid;

  res.json({
    noofkid,
    noofhealthykid,
    noofunhealthykid
  });

})

app.use(express.json());

app.post("/", function(req,res){

  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy
  })
  res.json({
    msg: "Done!"
  })
})

app.put("/", function(req,res){
  for(let i=0;i<users[0].kidneys.length;i++)
  {
    users[0].kidneys[i].healthy = true;
  }

  res.json({});
})

app.delete("/", function(req,res){

  const newkidney = [];
  for(let i=0;i<users[0].kidneys.length;i++)
  {
    if(users[0].kidneys[i].healthy)
    {
      newkidney.push({healthy: true});
    }
  }
  if(newkidney.length == users[0].kidneys.length)
  {
      res.status(411).json({
    msg: " you have no bad kidneys"
    });
  }
  else{
    users[0].kidneys = newkidney;
    res.json({msg: "Done!"});
  }
})

app.listen(3000);