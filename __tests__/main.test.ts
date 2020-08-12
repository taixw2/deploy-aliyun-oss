//
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config()
test('test runs', () => {
  process.env['INPUT_REGION'] = process.env.REGION
  process.env['INPUT_ACCESS-KEY-ID'] = process.env.ACCESS_KEY_ID
  process.env['INPUT_ACCESS-KEY-SECRET'] = process.env.ACCESS_KEY_SECRET
  process.env['INPUT_BUCKET'] = process.env.BUCKET
  process.env['INPUT_SECURE'] = process.env.SECURE
  process.env['INPUT_ENTRY'] = 'dist/**/*'
  process.env['INPUT_PATH-REWRITE'] = '^dist/'
  process.env['INPUT_REMOTE-DIR'] = '/'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  try {
    cp.spawnSync('node', [ip], options)
  } catch (error) {
    console.log('error', error)
  }
})
