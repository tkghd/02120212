import crypto from 'crypto'
export const sign = p => crypto.createHmac('sha256',process.env.SIGN_SECRET).update(JSON.stringify(p)).digest('hex')
export const verify = (p,s) => sign(p)===s
