import * as core from '@actions/core'
import OSS from 'ali-oss'
import glob from 'glob'


// import {wait} from './wait'

async function run(): Promise<void> {

  
  const REGION = core.getInput("region");
  const ACCESS_KEY_ID = core.getInput("access-key-id");
  const ACCESS_KEY_SECRET = core.getInput("access-key-secret");
  const BUCKET = core.getInput("bucket");
  const SECURE = core.getInput("secure");
  const ENTRY = core.getInput("entry");
  const REMOTE_DIR = core.getInput("remote-dir");

  const client = new OSS({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    secure: SECURE,
    bucket: BUCKET
  });

  // try {
  //   const ms: string = core.getInput('milliseconds')
  //   core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

  //   core.debug(new Date().toTimeString())
  //   await wait(parseInt(ms, 10))
  //   core.debug(new Date().toTimeString())

  //   core.setOutput('time', new Date().toTimeString())
  // } catch (error) {
  //   core.setFailed(error.message)
  // }
}

run()
