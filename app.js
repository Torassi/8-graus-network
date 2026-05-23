import { Graph } from './graph.js';
import { bfs, bfsLimit } from './bfs.js';

let graph;
let actors;

async function loadGraph() {
  const response = await fetch('latest_movies.json');
  const data = await response.json();

  graph = new Graph();
  const actorsSet = new Set();

  data.forEach(movie => {
    const movieNode = "🎬 " + movie.title;

    graph.addVertex(movieNode);

    movie.cast.forEach(actor => {
      const actorNode = "🧑 " + actor;

      graph.addVertex(actorNode);
      graph.addEdge(movieNode, actorNode);

      actorsSet.add(actor);
    });
  });

  actors = Array.from(actorsSet);
  fillActors();
}

function fillActors() {
  const datalist = document.getElementById("actors");

  actors.forEach(actor => {
    const option = document.createElement("option");
    option.value = actor;
    datalist.appendChild(option);
  });
}

window.findPath = function () {
  const a1 = "🧑 " + document.getElementById("actor1").value;
  const a2 = "🧑 " + document.getElementById("actor2").value;

  const path = bfs(graph, a1, a2);

  if (!path) {
    document.getElementById("result").innerText = "❌ Sem conexão";
    return;
  }

  document.getElementById("result").innerText =
    path.join(" → ") + "\nComprimento: " + (path.length - 1);
};

window.findPathsLimit = function () {
  const a1 = "🧑 " + document.getElementById("actor1").value;
  const a2 = "🧑 " + document.getElementById("actor2").value;

  const paths = bfsLimit(graph, a1, a2, 8, 50);

  if (paths.length === 0) {
    document.getElementById("result").innerText = "❌ Nenhum caminho até 8 graus";
    return;
  }

  let result = "";

  paths.forEach((p, i) => {
    result += `Caminho ${i + 1}:\n`;
    result += p.join(" → ") + "\n";
    result += "Comprimento: " + (p.length - 1) + "\n\n";
        if (paths.length === 50) {
        result += "⚠️ Exibindo apenas os primeiros 50 caminhos encontrados.\n";
        }
  });
  

  document.getElementById("result").innerText = result;
};

loadGraph();