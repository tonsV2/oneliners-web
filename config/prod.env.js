'use strict'

module.exports = {
  NODE_ENV: '"production"',
  // NOTE: This variable is substituted using envsubst in the Dockerfile
  ONELINERS_API: '"${ONELINERS_API}"'
}
