// eu quero passar um objeto aqui, pq assim ao construir o cssCollector as informaçoes do objeto já vão ser pegas
export default function CssCollector(objeto) {
  if (objeto) {
    this.width = window.getComputedStyle(objeto).width;
    this.height = window.getComputedStyle(objeto).height;
    this.parent = objeto.parentElement;
    this.position = window.getComputedStyle(objeto).position;
    this.display = window.getComputedStyle(objeto).display;
    this.container;

    // é quem vai adicionar o CssCollector a pagina
    this.collectorBody = function () {
      const body = document.querySelector("body");
      this.container = this.corpo();
      body.appendChild(this.container);
      /**se eu acionasse essa função antes de colocar os elementos na pagina html,
       * o elemento não seria achado*/
      this.funcoes();
      return this.container;
    };

    // é o corpo do objeto contendo suas informaçoes(monta o corpo)
    this.corpo = function () {
      const corpo = document.createElement("div");
      corpo.id = "cssCollector";
      corpo.innerHTML = `<div id='cabecalho'>
                            <h2>${objeto.tagName + "." + objeto.classList}</h2>
                            <button id='fechar'><img src='fotos/close.png'/></button>
                        </div>
                        <div id="informacoes">
                            <ul>
                                <li id="width">
                                    <img src="fotos/width.png" alt="largura" />
                                    <span>${this.width}</span>
                                </li>
                                <li id="height">
                                    <img src="../fotos/height.png" alt="altura" />
                                    <span>${this.height}</span>
                                </li>
                                <li id="position">
                                    <img src="fotos/position.png" alt="posicao" />
                                    <span>${this.position}</span>
                                </li>
                                <li id="display">
                                    <img src="fotos/display.png" alt="display" />
                                    <span>${this.display}</span>
                                </li>
                                <li id="parent">
                                    <img src="fotos/parent.png" alt="elemento-pai" />
                                    <span>${this.parent.tagName}</span>
                                </li>
                            </ul>
                            <div id="inputCss">
                                <input type="text" placeholder="Estilo..." />
                                <button id='enter'>
                                    <img src="fotos/enter.png" alt="" />
                                </button>
                            </div>
                        </div>`;
      return corpo;
    };

    // aqui se encontra todas as funçoes disponiveis pra esse objeto. Assim que o objeto
    // for instanciado, as funçoes serão acionadas
    this.funcoes = function () {
      /*
      ACIONA AS FUNÇOES
      */
      this.selecionaPai();
      this.desativaDisplay();
      this.setStyle();
    };
    // destaca quem é o pai do objeto selecionado
    this.selecionaPai = function () {
      let item = document.querySelector("#parent");
      console.log("aqui");
      item.addEventListener("click", () => {
        if (this.parent.style.border == "") {
          this.parent.style.border = "2px solid black";
        } else {
          this.parent.style.border = "";
        }
      });
    };
    // desativa e ativa o que foi setado no display
    this.desativaDisplay = function () {
      let item = document.querySelector("#display");
      item.addEventListener("click", () => {
        if (!this.btnAtivo) {
          objeto.style.display = this.display;
          item.style.border = "";
          this.btnAtivo = true;
          console.log("desligado");
        } else {
          item.style.border = "2px dotted white";
          objeto.style.display = "inherit";
          this.btnAtivo = false;
          console.log("ativo");
          console.log(objeto.style.display);
        }

        // console.log(window.getComputedStyle(objeto).display);
      });
    };
    // habilita a função de settar estilos css
    this.setStyle = function () {
      let btn = document.querySelector("#enter");
      let item = document.querySelector("#inputCss input");
      btn.addEventListener("click", () => {
        let property = item.value.split(":");
        objeto.style[property[0]] = property[1];
        item.value = "";
        // item.value = "";
      });
    };
  } else {
    console.log("passe um objeto");
  }
}
