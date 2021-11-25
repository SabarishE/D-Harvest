const express =require("express");
const cors =require("cors");

const {router} =require("./routes");

const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT,console.log("server started 🚀 on",PORT));


app.get("/",(req,res)=>{
    res.send("------Test GET request------");
    
      })

      app.use("/web-scrape",router);
