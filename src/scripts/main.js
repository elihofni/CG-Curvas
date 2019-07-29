import '../main.scss';
import GUI from './gui';
import { getAnguloSobreCurvaBezier, getBezierXY } from './bezier';

document.addEventListener('DOMContentLoaded', () => {
  /* Define o tamanho do canvas */
  const larguraCanvas = window.innerWidth * 0.75; // 75% da largura da tela
  const alturaCanvas = window.innerHeight * 0.95; // 75% da altura da tela
  const centroFiguraX = (larguraCanvas / 2) - 50;
  const centroFiguraY = (alturaCanvas / 2) - 50;


  /* Configurações básicas do canvas */
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  canvas.width = larguraCanvas;
  canvas.height = alturaCanvas;
  context.lineJoin = 'round'; // tipo de junção de pontos


  /* Valores padrão */
  let figura = 'batman';
  let intervalo = null;
  let V0 = [0, 0]; // Ponto inicial da curva padrão
  let V1 = [550, 60]; // Ponto de controle 1 da curva padrão
  let V2 = [-300, 120]; // Ponto de controle 2 da curva padrão
  let V3 = [700, 560]; // Ponto final da curva padrão
  let suavidade = 0.005; // Valor de incremento
  let cor = 'black'; // Cor inicial da figura
  let tipoFigura = '3d';
  let estaAnimando = false;


  // Instancia uma nova graphical user interface
  const gui = new GUI({ context, canvas, tipoFigura, figura, cor, larguraCanvas, alturaCanvas });


  /* Atualiza os limites X e Y baseado na tela do usuário */
  const [infoLimitesCanvas] = document.getElementsByClassName('info');
  infoLimitesCanvas.textContent = `X máx: ${larguraCanvas.toFixed(0)} .:. Y máx: ${alturaCanvas.toFixed(0)}`;


  gui.desenhaFigura({ transX: centroFiguraX, transY: centroFiguraY }); // Desenha a figura na primeira vez
  document.getElementById('figuras').addEventListener('change', (evt) => { // Atualiza a figura ao selecionar uma nova
    figura = evt.currentTarget.value;
    gui.setFigura(figura);

    if (!estaAnimando) {
      gui.limpa();
      gui.desenhaFigura({ transX: centroFiguraX, transY: centroFiguraY });
    }
  });


  /* Atualiza o valor da cor */
  document.getElementById('cores').addEventListener('change', (evt) => {
    cor = evt.currentTarget.value;
    gui.setCor(cor);

    if (!estaAnimando) {
      gui.limpa();
      gui.desenhaFigura({ transX: centroFiguraX, transY: centroFiguraY });
    }
  });


  /* Atualiza o valor da suavidade */
  document
    .getElementsByName('smoothness')
    .forEach(option => option.addEventListener('change', (evt) => {
      suavidade = Number(evt.target.value);
  }));


  /* Atualiza o valor do tipo de figura */
  document
    .getElementsByName('figure-type')
    .forEach(option => option.addEventListener('change', (evt) => {
      tipoFigura = evt.target.value;
      gui.setTipoFigura(tipoFigura);

      if (!estaAnimando) {
        gui.limpa();
        gui.desenhaFigura({ transX: centroFiguraX, transY: centroFiguraY });
      }
    }));


  /* Atualiza o valor das variaveis de controle da curva */
  document.getElementById('desenharCurva').addEventListener('click', () => {
    const v0 = document.getElementById('v0');
    const v1 = document.getElementById('v1');
    const v2 = document.getElementById('v2');
    const v3 = document.getElementById('v3');

    // pega o valor digitado ou o padrão (placeholder)
    const [v0x, v0y] = v0.value ? v0.value.split(',') : v0.placeholder.split(',');
    const [v1x, v1y] = v1.value ? v1.value.split(',') : v1.placeholder.split(',');
    const [v2x, v2y] = v2.value ? v2.value.split(',') : v2.placeholder.split(',');
    const [v3x, v3y] = v3.value ? v3.value.split(',') : v3.placeholder.split(',');

    // Converte os valores para número
    V0 = [Number(v0x) || 0, Number(v0y) || 0];
    V1 = [Number(v1x) || 0, Number(v1y) || 0];
    V2 = [Number(v2x) || 0, Number(v2y) || 0];
    V3 = [Number(v3x) || 0, Number(v3y) || 0];

    gui.desenhaCurva({ V0, V1, V2, V3, redesenhaFigura: true });
  });


  let cont = 0;
  function loop() {
    gui.limpa();

    context.save(); // Salva o contexto do canvas (evita rotationar sobre a última iteração)

    // redesenha a curva
    gui.desenhaCurva({ V0, V1, V2, V3 });


    /* Calcula O novo valor de translação sobre a curva */
    const coordenadaSobreCurva = getBezierXY(cont, V0, V1, V2, V3); // Calcula o ponto sobre a curva
    const anguloSobreCurva = getAnguloSobreCurvaBezier(cont, V0, V1, V2, V3); // Calcula o ângulo de rotação


    // Desenha a figura sob o ponto correto
    context.beginPath();
    context.translate(coordenadaSobreCurva.x, coordenadaSobreCurva.y);
    context.rotate(anguloSobreCurva);
    gui.desenhaFigura({
      transX: -50, // Centraliza a figura no eixo X
      transY: -50, // Centraliza a figura no eixo Y
    });
    context.restore();


    /* Atualiza o valor do contador */
    cont += suavidade;
    if (cont > 1) {
      cont = 0;
      estaAnimando = false;
      clearInterval(intervalo); // Para a animação da figura sobre a curva
    }
  }

  /* Anima a figura ao clicar no botão */
  document.getElementById('animarFigura').addEventListener('click', () => {
      cont = 0;
      if (estaAnimando) {
        clearInterval(intervalo);
        estaAnimando = false;
      } else {
        estaAnimando = true;
        intervalo = setInterval(loop, 50);
      }
  });
});

if (module.hot) {
  module.hot.accept();
}
