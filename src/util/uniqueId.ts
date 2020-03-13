const uniqueId = (() => {
  let num = 0;
  return (prefix = 'id') => `${prefix}_${num++}`;
})();

export default uniqueId;
