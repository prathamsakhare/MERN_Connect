
# CONNECT REACT TO NODEJS AND MONGODB @PS 

## Make sure you have made frontend before reading and started following this document!!!

#### Commands after first making the node server folder 

 * npm init -y 

#### make one new file -- index.js 

 * npm install express 

 ? Code 

const express = require('express');
 imports express js  

 ? Make a server now inside index.js 

 ### Code 

const server = express();
 initializes express and makes a server 

 #### Make one listening event, and give it two parameters, first one is -- port number and second one is the function 

server.listen(8080, () => {
    console.log('Server Started')
})

 ? Write a method on the server, that it .get 

server.get('/demo', (req,res) => {
    res.send('hello');
    
})

 * here you do get request from the server, for the frontend, which has path -- as its first parameter, and then a callback function, that consist the req as request and res as response 

 * and then you use res.send() for sending response to the frontend 
 ! to see the output go to -- http://localhost:8000/demo 


 ? go to the frontend page and go to the handleSubmit function of the form 

 * write a fetch() method for fetching the response 

fetch('http://localhost:8000/demo', {
      method : "GET"
    })

 * take url of the server as the first parameter, and then the method object as the second parameter, in which you specify the method : "GET" for the same server.get() method in the server's index.js 

 ? store the code inside the variable named as response, and then add async for the (e) because you are awaitng the response, and also add await for the fetch method 

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/demo', {
      method : "GET"
    })
    console.log(response);
  };


 ! now you are going to face an error, that is -- access to fetch has been blocked by cors policy 

 * To overcome this --  
 ? Go the the server's index.js, then add a cors variable, but before that --  

npm install cors

 ? then add cors variable for the port  

const cors = require('cors')


 ! here, while updating your code, you continuously have to restart the server by killing the node terminal and restarting it, to avoid this, use nodemon 

npm install -g nodemon

 ? after this, just kill the node terminal of the server and start it with --  

nodemon index.js

 ? after this, you have to use that cors since it is still showing the error 

 ? go to the index.js of server and USE the cors there  

server.use(cors());
 
 ! .use() is the middleware -- middleware is between the server and the frontend 

 ? now there in the terminal, you are seeing response now, but you are still unable to see that hello, to see that --  

 * go to the forms handleSubmit function and --  

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/demo', {
      method : "GET"
    });
    <!-- ! ----------------------------------- -->
    const data = await response.text();
    <!-- ! ----------------------------------- -->
    console.log(data);
  };

 ! Now we have to change the 'GET' method with 'POST' method because by get method everything that you send to the server can be seen in the url, so instead of get method we can use post method 

 * for replacing post with get --  
 * go to handleSubmit event of the frontend and change 'GET' with 'POST' then go to index.js of server and change server.get to server.post 

 ! Now you have to send the actual data of the form through the body of post method, and also you have to specify headers 

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/demo', {
      method : "POST",
      <!-- ! -------------------------------------- -->
      body : JSON.stringify(form),
      headers : {
        'Content-Type' : 'application/json'
      }
      <!-- ! -------------------------------------- -->
    });
    const data = await response.text();
    console.log(data);
  };


 ? Now go to the server.post() in server's index.js and then console.log(req.body) but --  
 * you will see the undefined in the server bcz you have to parse the data of the request first  

 * to do that make one more middleware named as bodyParser 
const bodyParser = require('body-parser')

 ? then use that middleware as --    
server.use(bodyParser.json())
 * there are two methods for parsing the data from bodyparser -- one is .json and other one is url encoded, so now we want the data in the form of json thats why we can take .json 


 ! use json instead of .send() for sending the response 

 ? so now we are sending req.body() in the response to the 'POST' request 
server.post('/demo', (req,res) => {
    console.log(req.body)
    res.json(req.body);
    
})


 ! also change the text() method as a json method in the data variable in frontend handleSubmit function 
const data = await response.json();


 ! Now we have completed complete connection of node and react 
 ? now we are going for the database part 

 * go to mongoose documentation quick start guide 

 ? first command in terminal of the server  
npm i mongoose

 * then you have to import mongoose in index.js of the server 


 ! Now you have to make a new folder named as 'database' and then open it inside the ternminal and initialize it by typing --  

mongod --dbpath

 ! keep it running 

 ? now you have to connect it to your application by connecting it with mongoose 

 ? copy the connection code from the documentation of the mongoose and paste it inside the index.js file of the server 


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('db connected')

}

 * now you can see in the server terminal that 'db connected' message 


 ! Now you can make a schema inside the index.js of the server -- the code as follows -  

const userSchema = new mongoose.Schema({
    username: String,
    password : String
  });

   * here you can customize the name of the schema and inside properties and its data types

   ! Now make a model inside index.js --  
const User = mongoose.model('User', userSchema);

 ! Now store that data inside the database 

 ? go to the post request of the server -- inside index.js 

server.post('/demo', (req,res) => {
    let user = new User();
    user.username = req.body.username
    user.password = req.body.password

    console.log(req.body)
    res.json(req.body);
    
})
 * make one new variable and created new User() object 

server.post('/demo', async (req,res) => {
    let user = new User();
    user.username = req.body.username
    user.password = req.body.password
    const doc = await user.save()
    console.log(doc)
    res.json(req.body);
    
})

 * also make one variable named as doc and save the user info inside it and log it so that we can see 

 ! Now go to the mongodb compass and make one new connection on the same port on which mongodb server is running of this app 


 ! CRUD Operations 

 ? Create operation -- by post request 


 ! now go to the server's index.js 
 * make one get request there for getting the submitted data 
server.get('/demo', async (req, res) => {
    const docs = User.find({})
    res.json(docs)
})

 ? Now go to the frontend as we want to display our data in the form of list in react 

 ! go to the react, make one function named as 'getUsers' and make a 'GET' request inside it, all other things are same as the 'POST' request but you can ignore body and header now 

const getUsers = async () => {
    const response = await fetch('http://localhost:8000/demo', {
      method : "GET",
    });
    const data = await response.json();
    console.log(data);
}

 * then to call this function put it into useEffect() 
useEffect(() => {
    getUsers();
},[])

 ! for getting the data set and update everytime 
 * you can make a new state variable as users 

const [users, setUsers] = useState([]);

 * and then you can set the data from the get request to the setUsers 

const getUsers = async () => {
    const response = await fetch('http://localhost:8000/demo', {
      method : "GET",
    });
    const data = await response.json();
    console.log(data);
    setUsers(data)
}

