require('colors');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
const { parsed: env } = require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const verifyEnv = ({ GRAPHQL_API }) => {
  if (!GRAPHQL_API) console.error('GRAPHQL_API NOT SET'.bgRed);
};

switch (process.env.NODE_ENV) {
  case 'development':
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
    break;

  default:
    throw new Error('ENVIORMENT VARS NOT SET'.bgRed.white);
}

verifyEnv(env);

module.exports = { env };
