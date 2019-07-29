const CORES = { // 0 < alpha < 1: Opacidade/Transparência
  purple: (alpha = 1) => `rgb(144, 0, 255, ${alpha})`,
  cyan: (alpha = 1) => `rgb(0, 255, 166, ${alpha})`,
  blue: (alpha = 1) => `rgb(0, 187, 255, ${alpha})`,
  red: (alpha = 1) => `rgb(204, 0, 0, ${alpha})`,
  green: (alpha = 1) => `rgb(0, 204, 60, ${alpha})`,
  orange: (alpha = 1) => `rgb(255, 55, 1, ${alpha})`,
  pink: (alpha = 1) => `rgb(234, 0, 255, ${alpha})`,
  white: (alpha = 1) => `rgb(255, 255, 255, ${alpha})`,
  black: (alpha = 1) => `rgb(0, 0, 0, ${alpha})`,
  yellow: (alpha = 1) => `rgb(255, 195, 0, ${alpha})`,
  brown: (alpha = 1) => `rgb(128, 52, 0, ${alpha})`,
};

export default CORES;
