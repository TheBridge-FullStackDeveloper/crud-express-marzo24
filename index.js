const express = require("express");
const app = express();
const PORT = 3001;

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@gmail.com",
  },
  {
    id: 3,
    name: "Shannon Jackson",
    email: "shannon@gmail.com",
  },
];

  
app.use(express.json())

app.get("/", (req, res) => {
  res.send({msg:"lista de members",members});
});

app.get("/id/:id", (req, res) => {
    const found = members.some(member => member.id == req.params.id)
  if (found) {
    const member = members[req.params.id - 1];
    res.send(member);
  }else{
    res.status(404).send("No te invetes ids")
  }
});

app.post("/",(req,res)=>{
    const newMember ={
        id:members.length +1,
        name:req.body.name,
        email:req.body.email,
    }
    members.push(newMember)
    res.status(201).send(members)
})

app.put("/id/:id",(req,res)=>{
    const found = members.some(member => member.id == req.params.id)

    if(found){
        members.forEach(member =>{
            if(member.id == req.params.id){
                // member.name =req.body.name || member.name
                member.name =req.body.name ?req.body.name: member.name
                member.email =req.body.email || member.email
            }
        })
        res.send(members)
    }else{
        res.status(404).send(`Member with id ${req.params.id} not found`)
    }
})

app.delete("/id/:id",(req,res)=>{
    const found = members.some(member => member.id == req.params.id)
    if(found){
        const membersFilter = members.filter(member => member.id != req.params.id)
        res.send(membersFilter)
    }else{
        res.status(404).send(`Member with id ${req.params.id} not found`)
    }
})

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
