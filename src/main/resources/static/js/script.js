let dragSourceIndex = null; // variável global p/ saber de onde arrastou

function mostrarTela(id) {
      document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
      document.getElementById(id).classList.add("ativa");
    }

    async function carregarListas() {
      try {
        const resposta = await fetch("http://localhost:8080/lists");
        const listas = await resposta.json();

        const container = document.getElementById("listas");
        container.innerHTML = "";

        listas.forEach(lista => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `<h3>${lista.name}</h3>`;
          card.onclick = () => carregarJogos(lista.id);
          container.appendChild(card);
        });
      } catch (error) {
        console.error("Erro ao carregar listas:", error);
      }
    }

    async function carregarJogos(listaId) {
      try {
        const resposta = await fetch(`http://localhost:8080/lists/${listaId}/games`);
        const jogos = await resposta.json();

        const container = document.getElementById("jogos");
        container.innerHTML = "";

        jogos.forEach((jogo, index) => {
          const card = document.createElement("div");
          card.className = "card";
		  card.draggable = true; // habilita drag
		  card.dataset.index = index; // guarda a posição
		  
          card.innerHTML = `
            <img src="${jogo.imgUrl}" alt="${jogo.title}">
            <h3>${jogo.title}</h3>
            <p><b>Ano:</b> ${jogo.year}</p>
          `;
          card.ondblclick = () => carregarJogo(jogo.id);
		  

		  // eventos de drag & drop
		  card.addEventListener("dragstart", (e) => {
		    dragSourceIndex = index;
		    e.dataTransfer.effectAllowed = "move";
		  });

		  card.addEventListener("dragover", (e) => {
		    e.preventDefault(); // permite o drop
		  });

		  card.addEventListener("drop", async (e) => {
		    e.preventDefault();
		    const destinationIndex = parseInt(card.dataset.index);

		    if (dragSourceIndex !== null && dragSourceIndex !== destinationIndex) {
		      await atualizarOrdem(listaId, dragSourceIndex, destinationIndex);
			  dragSourceIndex = null;
		    }
		  });
		  
          container.appendChild(card);
        });

        mostrarTela("tela-jogos");
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      }
    }

    async function carregarJogo(jogoId) {
      try {
        const resposta = await fetch(`http://localhost:8080/games/${jogoId}`);
        const jogo = await resposta.json();

        const container = document.getElementById("detalhes");
        container.innerHTML = `
          <div class="card">
            <img src="${jogo.imgUrl}" alt="${jogo.title}">
            <h3>${jogo.title}</h3>
            <p><b>Ano:</b> ${jogo.year}</p>
            <p><b>Descrição:</b> ${jogo.shortDescription}</p>
            <p><b>Gênero:</b> ${jogo.genre}</p>
            <p><b>Plataformas:</b> ${jogo.platforms}</p>
            <p><b>Avaliação:</b> ${jogo.score}</p>
            <p><b>Saiba mais:</b> ${jogo.longDescription}</p>
          </div>
        `;
		container.draggable = false;


        mostrarTela("tela-detalhes");
      } catch (error) {
        console.error("Erro ao carregar jogo:", error);
      }
    }

    // inicia carregando listas
    carregarListas();
	
	
	async function atualizarOrdem(listId, sourceIndex, destinationIndex) {
	  try {
	    await fetch(`http://localhost:8080/lists/${listId}/replacement`, {
	      method: "POST",
	      headers: { "Content-Type": "application/json" },
	      body: JSON.stringify({ sourceIndex, destinationIndex })
	    });

	    console.log(`Movido de ${sourceIndex} para ${destinationIndex}`);
	    // recarrega os jogos para atualizar a ordem vinda do backend
	    carregarJogos(listId);

	  } catch (error) {
	    console.error("Erro ao atualizar ordem:", error);
	  }
	}