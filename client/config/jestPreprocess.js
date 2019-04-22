const flowRemoveTypes = require('flow-remove-types');
const babelOptions = require('./babel.dev.js');

const babelJest = require('babel-jest').createTransformer(babelOptions);

/**
 * Some backpack components (e.g. button) have flow types which
 * we need to strip before compiling. There is a babel
 * transform that should be able to do this
 * (babel-plugin-transform-flow-strip-types). However, I wasn't
 * able to get it to work with the current setup as even when
 * added to the babel config I continued to get errors about
 * types.
 * 
 * Instead, for webpack we use the remove-flow-types-loader
 * mentioned in the remove-flow-types readme.
 * For Jest we use babel-jest to transform js files using
 * the dev babel config. Before that though, we pass the src
 * through flow-remove-types.
 * 
 * While this works, babel-jest does some level of caching so
 * changing just types may not cause the tests to be re-run.
 * In this case, as flow types are only present on backpack
 * components, this is not an issue. If flow types were
 * introduced in to this repo, this approach would need to
 * be revisited.
 */
module.exports = Object.assign({}, babelJest, {
  process(src, filename, config, transformOptions) {
    return babelJest.process(flowRemoveTypes(src).toString(), filename, config, transformOptions);
  },
});