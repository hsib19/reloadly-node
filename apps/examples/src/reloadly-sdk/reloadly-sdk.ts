import { Reloadly } from 'reloadly-node'
import { env } from '../config/env'

export const reloadlySDK = new Reloadly({
    clientId: env.reloadly.clientId,
    clientSecret: env.reloadly.clientSecret,
    environment: env.reloadly.environment,
})
