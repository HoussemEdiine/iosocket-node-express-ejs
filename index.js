const app = require('express')() 
const http = require('http').Server(app)
const ejs  = require('ejs')
const PORT = 8080
const io = require('socket.io')(http)

// set the view engine in our case ejs 
app.set('view engine','ejs')

// render index.ejs file 
app.get("/", (req,res)=> {
    res.render('index')
})
 let users = []
// io socket connection 
io.on('connection',(socket) => {
   console.log('A user connected')
   socket.on('setUsername',(data)=>{
       if(users.indexOf(data)>-1){
         socket.emit('userExists', data + ' username already taken ! please choose annother !')  

       }
       else{
           users.push(data);
           socket.emit('userSet',{username:data})
           
       }
   })
     socket.on('msg', (data)=>{
         io.sockets.emit('newmsg',data)
     })
    
  socket.on('disconnect', () => {
     console.log('A user disconected')  
    
  })
     
})



http.listen(PORT , () => console.log(` server running  on ${PORT}....`))

