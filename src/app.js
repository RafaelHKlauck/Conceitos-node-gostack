const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateId)

function validateId(req, res, next) {
  const { id } = req.params

  if(!isUuid(id)) 
    return res.status(400).json({ error: 'Invalid repository ID'})
  
  return next()
}

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO(criar um novo repositorio)
  const {title, url, techs} = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,  
  }
  repositories.push(repository);
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if(repositoryIndex < 0)
    return response.status(400).json({error: "Repository not found"})

  const { title, url, techs} = request.body

  const likes = repositories[repositoryIndex].likes
  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }
  repositories[repositoryIndex] = repository
  return response.json(repository);
})

app.delete("/repositories/:id", (request, response) => {
  // TODO(deletar repositorio)
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" }); 
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO(acrescentar 1 like)
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" }); 
  }
  const repository = repositories[repositoryIndex] 
  const likes = repository.likes;
  const newRepository = {
    ...repository,
    likes: likes + 1, 
  } 
  repositories[repositoryIndex] = newRepository
  return response.status(200).json(newRepository)
});

module.exports = app;
