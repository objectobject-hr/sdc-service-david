const { QueryFile } = require("pg-promise");

const sql = function sql(fullPath) {
  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true
    // See also property 'params' for two-step template formatting
  };
  const qf = new QueryFile(fullPath, options);
  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }
  return qf;
};
module.exports = sql;
