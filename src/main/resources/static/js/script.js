async function carregarJogos(listaId) {
  try {
    // Chame sua API Spring Boot
    const resposta = await fetch(`http://localhost:8080/lists/${listaId}/games`);
    const jogos = await resposta.json();

    const container = document.getElementById("lista-jogos");
    container.innerHTML = ""; // limpa antes de inserir

    jogos.forEach(jogo => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${jogo.imgUrl}" alt="${jogo.title}">
        <h3>${jogo.title}</h3>
        <p><b>Ano:</b> ${jogo.year}</p>
        <p><b>Descrição:</b> ${jogo.shortDescription}</p>
      `;
	  card.onclick = () => carregarJogo(jogo.id);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar jogos:", error);
  }
}

async function carregarJogo(jogoId) {
  try {
    // Chame sua API Spring Boot
    const resposta = await fetch(`http://localhost:8080/games/${jogoId}`);
    const jogo = await resposta.json();

    const container = document.getElementById("lista-jogos");
    container.innerHTML = ""; // limpa antes de inserir

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${jogo.imgUrl}" alt="${jogo.title}">
        <h3>${jogo.title}</h3>
        <p><b>Ano:</b> ${jogo.year}</p>
        <p><b>Descrição:</b> ${jogo.shortDescription}</p>
		<p><b>Gênero:</b> ${jogo.genre}</p>
		<p><b>Platformas:</b> ${jogo.platforms}</p>
		<p><b>Avaliação:</b> ${jogo.score}</p>
		<p><b>Saiba mais:</b> ${jogo.longDescription}</p>
      `;

      container.appendChild(card);

  } catch (error) {
    console.error("Erro ao carregar jogos:", error);
  }
}

async function carregarListas() {
  try {
    // Chame sua API Spring Boot
    const resposta = await fetch("http://localhost:8080/lists");
    const listas = await resposta.json();

    const container = document.getElementById("lista-jogos");
    container.innerHTML = ""; // limpa antes de inserir

    listas.forEach(listaObj => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${listaObj.name}</h3>
      `;
	  card.onclick = () => carregarJogos(listaObj.id);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar jogos:", error);
  }
}

// Chama a função quando a página abrir
carregarListas();