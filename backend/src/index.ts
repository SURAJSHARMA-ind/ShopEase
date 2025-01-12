import { error } from "console";
import app from "./app";
import connectDB from "./database/dbConnection";

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || "localhost";

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at : http://${hostname}:${port}/`);
  })
}).catch((error)=>{
  console.log(error);
})