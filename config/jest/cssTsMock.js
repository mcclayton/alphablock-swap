module.exports = getSelfProxy();

function getSelfProxy() {
  return new Proxy(
    {},
    {
      get: (target, prop) =>
        ['toString', 'valueOf', Symbol.toPrimitive].includes(prop)
          ? () =>
              `cssTsMocked-${
                prop === Symbol.toPrimitive ? 'Symbol.toPrimitive' : prop
              }`
          : getSelfProxy(),
    },
  );
}
