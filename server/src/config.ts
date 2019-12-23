// Contents of src/config.ts
import 'colors'

import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'


switch (process.env.NODE_ENV) {
  case "development":
    console.log("Environment is 'development'".blue)
    configDotenv({
      path: resolve(__dirname, '../.env.development')
    })
    break
  case "test":
    configDotenv({
      path: resolve(__dirname, "../.env.test")
    })
    break
  case "production":
    configDotenv({
      path: resolve(__dirname, "../.env.production")
    })
    break
  // Add 'staging' and 'production' cases here as well!
  default:
    configDotenv({
      path: resolve(__dirname, "../.env")
    })
}

export const {
  NODE_ENV,
  PORT,
  GQL_ENDPOINT,
  FRONTEND_URL,
  APP_SECRET,
} = process.env




