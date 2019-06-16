const decompose = num =>
  new Promise((mainResolve, mainReject) => {
    let timeout = null;
    let cancelled = false;

    // cancel execution after timeout
    timeout = setTimeout(() => {
      cancelled = true
    }, 500);

    // init cancelable promise
    const findDelimeters = num => new Promise((res, rej) => {
      const delimeters = new Map();

      delimeters.set(1, 1);
      let delimiter = 2;

      (function tryNextDelimeter() {
        if (num % delimiter === 0) {
          delimeters.set(delimiter, delimeters.get(delimiter) + 1 || 1);
          num = num / delimiter;
        } else {
          delimiter++;
        }
        if (delimiter <= num && !cancelled) {
          setImmediate(tryNextDelimeter);
        } else if (cancelled) {
          rej();
        } else {
          clearTimeout(timeout);
          res(delimeters)
        }
      })();
    });

    // format delimeters map
    function stringifyMap(map){
      let result = '';

      for (let [key, value] of map) {
        if (value === 1) {
          result = result.concat(`${key} * `);
        } else {
          result = result.concat(`${key}^${value}* `);
        }
      }
      return result.slice(0, -2);
    }

    // resolve promise
    findDelimeters(num)
      .then(res => mainResolve(stringifyMap(res)))
      .catch(() => mainReject('It\'s too difficult for me =('));
  });

module.exports = decompose;
