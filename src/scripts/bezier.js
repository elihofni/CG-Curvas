/*
 * 0 < t < 1    =>  % sobre a curva
 * V0: [x, y] ponto inicial
 * V1: [x, y] ponto de controle 1
 * V2: [x, y] ponto de controle 2
 * V3: [x, y] ponto final
 */
export function getBezierXY(t, [iniX, iniY], [pControle1X, pControle1Y], [pControle2X, pControle2Y], [fimX, fimY]) {
  return {
    x: Math.pow(1 - t, 3) * iniX + 3 * t * Math.pow(1 - t, 2) * pControle1X + 3 * t * t * (1 - t) * pControle2X + t * t * t * fimX,
    y: Math.pow(1 - t, 3) * iniY + 3 * t * Math.pow(1 - t, 2) * pControle1Y + 3 * t * t * (1 - t) * pControle2Y + t * t * t * fimY,
  };
}

/*
 * 0 < t < 1    =>  % sobre a curva
 * V0: [x, y] ponto inicial
 * V1: [x, y] ponto de controle 1
 * V2: [x, y] ponto de controle 2
 * V3: [x, y] ponto final
 */
export function getAnguloSobreCurvaBezier(t, [iniX, iniY], [pControle1X, pControle1Y], [pControle2X, pControle2Y], [fimX, fimY]) {
  const dx = Math.pow(1 - t, 2) * (pControle1X - iniX) + 2 * t * (1 - t) * (pControle2X - pControle1X) + t * t * (fimX - pControle2X);
  const dy = Math.pow(1 - t, 2) * (pControle1Y - iniY) + 2 * t * (1 - t) * (pControle2Y - pControle1Y) + t * t * (fimY - pControle2Y);
  return -Math.atan2(dx, dy) + 0.5 * Math.PI;
}
