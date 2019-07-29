import FIGURAS from './figuras';
import CORES from './cores';

export default class GUI {
  constructor({ context, canvas, figura, tipoFigura, cor, larguraCanvas, alturaCanvas }) {
    this.context = context;
    this.canvas = canvas;
    this.tipoFigura = tipoFigura;
    this.figura = figura;
    this.cor = cor;
    this.larguraCanvas = larguraCanvas;
    this.alturaCanvas = alturaCanvas;
  }


  setTipoFigura(tipoFigura) {
    this.tipoFigura = tipoFigura;
  }


  setFigura(figura) {
    this.figura = figura;
  }


  setCor(cor) {
    this.cor = cor;
  }


  /**
   * @param {Number} transX Valor para transladar a figura no eixo X
   * @param {Number} transY Valor para transladar a figura no eixo Y
   */
  desenhaFigura({ transX = 0, transY = 0 }) {
    const { vertexes } = FIGURAS[this.figura];
    const ehFigura3D = this.tipoFigura === '3d';
    const cisalhamento = ehFigura3D ? 0.3 : 0; // valor para o cisalhamento

    // BAIXO
    this.context.beginPath();
    vertexes.forEach(([x, y]) => this.context.lineTo(x + (cisalhamento * y) + transX, y + (cisalhamento * x) + transY)); // Translada o vértice para a posição adequada na tela
    this.context.closePath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = CORES[this.cor]();
    this.context.stroke();


    if (ehFigura3D) {
      // ARESTAS ENTRE
      this.context.beginPath();
      vertexes.forEach(([x, y]) => {
        // Translada o vértice para a posição adequada na tela
        this.context.moveTo(x + (cisalhamento * y) + transX, y + (cisalhamento * x) + transY);
        this.context.lineTo(x + (cisalhamento * y) + transX + 50, y + (cisalhamento * x) + transY - 50);
      });
      this.context.closePath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = CORES[this.cor]();
      this.context.stroke();


      // CIMA
      this.context.beginPath();
      vertexes.forEach(([x, y]) => this.context.lineTo(x + (cisalhamento * y) + transX + 50, y + (cisalhamento * x) + transY - 50)); // Translada o vértice para a posição adequada na tela
      this.context.closePath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = CORES[this.cor]();
      this.context.stroke();
    }
  }


  /* Desenha a curva baseado nos pontos de controle fornecidos */
  desenhaCurva({ redesenhaFigura = false, V0 = [], V1 = [], V2 = [], V3 = [], transX = -50, transY = -50 }) {
    const [v0x, v0y] = V0;
    const [v1x, v1y] = V1;
    const [v2x, v2y] = V2;
    const [v3x, v3y] = V3;

    if (redesenhaFigura) {
      this.limpa(this.larguraCanvas, this.alturaCanvas);
      this.desenhaFigura({ transX, transY });
    }

    this.context.beginPath();
    this.context.moveTo(v0x, v0y);
    this.context.bezierCurveTo(v1x, v1y, v2x, v2y, v3x, v3y);
    this.context.strokeStyle = 'red'; // Cor da curva
    this.context.stroke();
  }


  /* Limpa o canvas */
  limpa() {
    this.context.clearRect(0, 0, this.larguraCanvas, this.alturaCanvas);
  }
}
