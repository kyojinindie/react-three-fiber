export const positions1 = () => {
  const _positions = [];

  for (let i = 0; i < 64; i++) {
    _positions.push({
      position: [Math.sin(i * 0.1) * 4, 0, Math.cos(i * 0.1)]
    });
  }
  //console.log(_positions);
  return _positions;
};

export const positions2 = () => {
  const _positions = [];

  for (let i = 45; i < 112; i++) {
    _positions.push({
      position: [Math.sin(i * 0.1) * 4, 0, Math.cos(i * 0.1)]
    });
  }
  //console.log(_positions);
  return _positions;
};

export const positions3 = () => {
  const _positions = [];

  for (let i = 85; i < 140; i++) {
    _positions.push({
      position: [Math.sin(i * 0.1) * 4, 0, Math.cos(i * 0.1)]
    });
  }
  //console.log(_positions);
  return _positions;
};
