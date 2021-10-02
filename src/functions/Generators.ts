export const MiddleSquares = async (seed: number): Promise<number[]> => {
  const getNextRandom = (seed: number): number => {
    let square: String = '' + Math.pow(seed, 2);
    while (square.length < 8) square = '0' + square;
    return Number(square.substr(2, 4));
  };
  let set = new Set();
  const randoms: number[] = [];
  let rnd = seed;
  while (!set.has(rnd)) {
    randoms.push(rnd / 10000);
    set.add(rnd);
    rnd = getNextRandom(rnd);
  }
  return randoms;
};
