import express from 'express';
import fs from"fs";
import bodyParser from "body-parser";
const app =express();
app.use(bodyParser.json());
const readData = ()=>{
   try{
    const data = fs.readFileSync("db.json");
    return (JSON.parse(data));
   }
   catch(error){
    console.log(error);
   }
}
const writeData = (data) => {
    try {
      fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
app.get("/",(req,res)=>{
    res.send("hola");
})
app.get("/personas", (req, res) => {
    const data = readData();
    res.json(data.personas);
  });
  app.get("/personas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const persona = data.personas.find((persona) => persona.id === id);
    res.json(persona);
  });
  app.post("/personas", (req, res) => {
    const data = readData();
    const body = req.body;
    const newPersona = {
      id: data.personas.length + 1,
      ...body,
    };
    data.personas.push(newPersona);
    writeData(data);
    res.json(newPersona);
  });
  app.put("/personas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const personaIndex = data.personas.findIndex((persona) => persona.id === id);
    data.personas[personaIndex] = {
      ...data.personas[personaIndex],
      ...body,
    };
    writeData(data);
    res.json({ message: "Persona actualizada" });
  });
  app.delete("/personas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const personaIndex = data.personas.findIndex((persona) => persona.id === id);
    data.personas.splice(personaIndex, 1);
    writeData(data);
    res.json({ message: "usuario eliminado" });
  });
  
app.listen(3000,()=>{
    console.log("estoy escuchando");
})