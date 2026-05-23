export function bfs(graph, start, end) {
  const queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);

      const neighbors = graph.adjList.get(node) || [];

      for (let neighbor of neighbors) {
        queue.push([...path, neighbor]);
      }
    }
  }

  return null;
}

export function bfsLimit(graph, start, end, maxDepth = 8, maxResults = 50) {
  const queue = [[start]];
  const results = [];

  let explored = 0;
  const maxExplored = 20000;

  while (queue.length > 0) {
    const path = queue.shift();

    // 🔴 limite de resultados
    if (results.length >= maxResults) break;

    // 🔴 limite de segurança
    explored++;
    if (explored > maxExplored) {
      console.warn("Limite de exploração atingido");
      break;
    }

    const depth = path.length - 1;
    if (depth > maxDepth) continue;

    const node = path[path.length - 1];

    if (node === end) {
      results.push(path);
      continue;
    }

    const neighbors = graph.adjList.get(node) || [];

    for (let neighbor of neighbors) {
      if (!path.includes(neighbor)) {
        queue.push([...path, neighbor]);
      }
    }
  }

  return results;
}