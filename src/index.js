const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const findRepository = repositories.find(i => i.id === id);

  if(!findRepository) {
    return response.status(404).json({error: 'error'})
  }

  findRepository.title = title;
  findRepository.url = url
  findRepository.techs = techs;

  return response.status(201).json(findRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.find(i => i.id === id);
  const findRepositoryIndex = repositories.indexOf(findRepository);

  if(!findRepository) {
    return response.status(404).json({error: 'error'})
  }

  repositories.splice(findRepositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.find(i => i.id === id);

  if(!findRepository) {
    return response.status(404).json({error: 'error'})
  }


  const likes = ++findRepository.likes;
  findRepository.likes = likes;


  return response.status(201).json(findRepository);
});

module.exports = app;
