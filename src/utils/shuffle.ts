export const shuffle = <T>(arr: T[]): T[] => {
  const mutableArr = [...arr];
  let i = mutableArr.length;
  while (--i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const temporary = mutableArr[j];
    mutableArr[j] = mutableArr[i];
    mutableArr[i] = temporary;
  }
  return mutableArr;
};
