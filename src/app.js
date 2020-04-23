const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

    return response.json(repositories);

});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    const newProject = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0,
    };

    repositories.push(newProject);    

    return response.json(newProject);    
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
  const searchId = repositories.find(r => r.id === id ); 

  if (searchId === undefined) {
    return  response.status(400).json();
    }

  const likes = repositories[repositorieIndex].likes;    
    
  const alterRepositorie = {
      id,
      url,
      title,
      techs,
      likes
    }

  repositories[repositorieIndex] = alterRepositorie;
  return response.json(alterRepositorie);   

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
  const searchId = repositories.find(r => r.id === id );
  
  if (searchId === undefined) {
    return response.status(400).json();
    
      }
  
    
  function remove(){
    repositories.splice(repositorieIndex, 1);
    return response.status(204).json();
  }
  
  remove(); 

});

app.post("/repositories/:id/like", (request, response) => {
 const { id } = request.params;

 const searchId = repositories.find(r => r.id === id );

 if (searchId === undefined) {
  
   return response.status(400).json();
   
 };


 const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

var like = repositories[repositorieIndex].likes ;

like = like + 1;

repositories[repositorieIndex].likes = like;

 return response.json(repositories[repositorieIndex]);


});

module.exports = app;
