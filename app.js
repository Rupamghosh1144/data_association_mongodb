const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.listen(3000,()=>{
  console.log("server connected");
})


app.get('/',(req,res)=>{
  res.send("Hello");
})


app.get('/create',async (req,res)=>{
  let user =await userModel.create({
    username:"Rupam",
    email:"ghoshrupam1144@gmail.com",
    age:22
  })

  res.send(user);
})



app.get('/post/create',async (req,res)=>{
  let post = await postModel.create({
    post:"hello my name is rupam",
    user: "689a00db1f01cdf7614c5332"
  })

  let user = await userModel.findOne({_id:"689a00db1f01cdf7614c5332"});
  user.posts.push(post._id);
  await user.save();
  res.send({post, user});
})
