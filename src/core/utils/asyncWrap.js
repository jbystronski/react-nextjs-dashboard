function asyncWrap(promise, extend) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      throwNativeError(err);
      if (extend) err = Object.assign(err, extend);
      return [err];
    });
}

function throwNativeError(err) {
  const NativeError = [
    TypeError,
    RangeError,
    ReferenceError,
    SyntaxError
  ].reduce((acc, curr) => (acc = err instanceof curr ? curr : acc), null);

  if (NativeError) throw new NativeError(err);
}

module.exports = { asyncWrap };
