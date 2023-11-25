let express=require("express");
let app=express();
app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Orihgin, X-Requested-With, Content-Type, Accept"

    );
    next();
});
var port = process.env.PORT || 2410;
app.listen(port,()=>console.log(`Listening on port ${port}!`));

let {carData}=require("./carData.js");

let {carMasterData}=require("./carData.js");

app.get("/cars",function(req,res){
   
    let arr1=carData;
    let arr2=carMasterData;
  let minprice=req.query.minprice;
  let maxprice=req.query.maxprice;
  let sort=req.query.sort;
  let type =req.query.type ;
 
  let fuel=req.query.fuel;
  if(fuel) {
   find=arr2.filter((f)=>f.fuel==fuel);
   arr1=arr1.filter((f)=>find.find(s=>s.model===f.model))

}
if(type) {
    find=arr2.filter((f)=>f.type==type);
    arr1=arr1.filter((f)=>find.find(s=>s.model===f.model))

  
 }
  if(minprice) {
 
    arr1=arr1.filter((f)=>f.price>=minprice);
}

if(maxprice) {
    arr1=arr1.filter((f)=>f.price<=maxprice);
}

if(sort=="kms"){
    arr1=arr1.sort((st1,st2)=> st1.kms-st2.kms);
}
if(sort=="price"){
    arr1=arr1.sort((st1,st2)=> st1.price-st2.price);
}
if(sort=="year"){
    arr1=arr1.sort((st1,st2)=> st1.year-st2.year);
}
    res.send(arr1); 
    
});


app.get("/carmaster",function(req,res){
   
    res.send(carMasterData);  
});

app.get("/cars/:id", function(req,res){
    let id=req.params.id;
    let car=carData.find((st)=>st.id === id);
    res.send(car);
 });

app.post("/cars", function(req, res){
    let body=req.body;

    console.log(body);

    let newcar={ ...body };
    carData.push(newcar);
    res.send(newcar);
});

app.put("/cars/:id",function(req,res){
    let id=req.params.id;
    let body=req.body;
    let index=carData.findIndex((st)=>st.id===id);
    if(index>=0){
        let updatecar={...body};
        carData[index]=updatecar;
       res.send(updatecar);
    }
    else res.status(404).send("No student found");
});

app.delete("/cars/:id",function(req,res){
    let id=req.params.id;
    let index=carData.findIndex((st)=>st.id===id);
    if(index>=0){
        let deletecar=carData.splice(index,1);
       
       res.send(deletecar);
    }
   
    else res.status(404).send("No student found");

});
