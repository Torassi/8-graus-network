# 🎬 8 Graus de Network

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![ES Modules](https://img.shields.io/badge/ES%20Modules-native-blue)
![Status](https://img.shields.io/badge/status-concluído-brightgreen)

Uma variação do clássico "seis graus de Kevin Bacon": digite dois atores e a ferramenta encontra o caminho mais curto entre eles através de filmes em comum, usando busca em largura (BFS) num grafo ator ↔ filme.

## O que ela faz

- Monta um grafo onde atores e filmes são vértices, e uma aresta liga um ator a cada filme em que ele atuou (dataset embutido com 1500 filmes e seus elencos, em `latest_movies.json`);
- Campos com autocomplete (`datalist`) para escolher os atores de origem e destino a partir do elenco carregado;
- **Buscar Caminho**: encontra o caminho mais curto entre os dois atores via BFS clássico;
- **Buscar até 8 graus**: lista até 50 caminhos diferentes entre os dois atores, limitados a 8 graus de separação, com proteção contra explosão de busca (limite de 20.000 nós explorados);
- Exibe o caminho formatado como `🎬 Filme → 🧑 Ator → 🎬 Filme → ...` junto com o comprimento do caminho.

## Tecnologias

JavaScript puro com **ES Modules** nativos (`import`/`export`), sem build, sem dependências externas. HTML5 e CSS3 para a interface.

## Pré-requisitos

Um navegador moderno com suporte a módulos ES. Como o app usa `fetch()` para carregar o `latest_movies.json` e importa módulos via `<script type="module">`, **não dá para abrir o `index.html` direto do disco** — o navegador bloqueia `fetch`/módulos em `file://` por CORS. É preciso servir por HTTP.

## Como rodar localmente

```bash
git clone https://github.com/Torassi/8-graus-network.git
cd 8-graus-network
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Como usar

1. Digite (ou selecione pelo autocomplete) o ator de origem e o ator de destino;
2. Clique em **Buscar Caminho** para o caminho mais curto entre eles;
3. Clique em **Buscar até 8 graus** para ver várias conexões possíveis, até 8 graus de distância.

Se não houver conexão entre os dois atores dentro do grafo carregado, a ferramenta avisa que não encontrou caminho.

## Autor

Leonardo Torassi
