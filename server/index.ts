import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});
let cur = getCur(0, 100)


// app.get('/', (req,res) => res.send('Express + TypeScript Serverkkk'));

io.on('connection', socket => {
  socket.emit('getData', cur)
})

httpServer.listen(3000)

// function getIntervalCur() {
//   setInterval(() => getCur(0, 100), 3000)
// }

function getCur(min: number, max: number) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}