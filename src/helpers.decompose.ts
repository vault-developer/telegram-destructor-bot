const findDivisors = num => new Promise(res => {
  const divisors = new Map([[1, 1]]);
  let divisor = 2;

  (function tryNext() {
    if (num % divisor === 0) {
      divisors.set(divisor, (divisors.get(divisor) || 0) + 1);
      num = num / divisor;
    } else {
      divisor++;
    }
    if (divisor <= num) {
      setImmediate(tryNext);
    } else {
      res(Array.from(divisors.entries()));
    }
  })();
});

const stringifyDivisors = divisors =>
  divisors.reduce((acc, [key, value]) =>
    acc.concat(`${key}${value === 1 ? "" : `^${value}`} * `), "")
    .slice(0, -2);

const getStringifiedDivisors = async num => {
  const divisors = await findDivisors(num);
  return stringifyDivisors(divisors);
};

const getTimeoutError = ms =>
  new Promise((_, rej) =>
    setTimeout(() => rej("It's too difficult for me =("), ms));

export default num => Promise.race([getStringifiedDivisors(num), getTimeoutError(500)]);
