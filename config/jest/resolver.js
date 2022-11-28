'use strict';

/**
 * For more information on why this resolver is necessary,
 * please see: https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
 * and: https://jestjs.io/docs/28.x/upgrading-to-jest28#packagejson-exports
 */

const ESM_BROWSER_PACKAGES = [
  'uuid',
  'nanoid',
  '@react-hook/resize-observer',
  '@react-hook/passive-layout-effect',
  '@react-hook/latest',
];

module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: (pkg) => {
      // This is a workaround for https://github.com/uuidjs/uuid/pull/616
      //
      // jest-environment-jsdom 28+ tries to use browser exports instead of default exports,
      // but uuid (and other packages in ESM_BROWSER_PACKAGES) only offers an ESM browser export and not a CommonJS one.
      // Jest does not yet support ESM modules natively, so this causes a Jest error related to trying to parse
      // "export" syntax.
      //
      // This workaround prevents Jest from considering PACKAGES_WITH_MODULE_EXPORTS module-based exports at all;
      // it falls back to uuid's CommonJS+node "main" property.
      if (ESM_BROWSER_PACKAGES.includes(pkg.name)) {
        delete pkg['exports'];
        delete pkg['module'];
      }
      return pkg;
    },
  });
};
