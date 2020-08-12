import * as core from '@actions/core'
import AliyunOSS from 'ali-oss'
import glob from 'glob'

async function run(): Promise<void> {
  try {
    const REGION = core.getInput('region')
    const ACCESS_KEY_ID = core.getInput('access-key-id')
    const ACCESS_KEY_SECRET = core.getInput('access-key-secret')
    const BUCKET = core.getInput('bucket')
    const SECURE = core.getInput('secure')
    //
    const ENTRY = core.getInput('entry')
    const REMOTE_DIR = core.getInput('remote-dir')
    const PATH_REWRITE = core.getInput('path-rewrite')

    const client = new AliyunOSS({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      accessKeySecret: ACCESS_KEY_SECRET,
      secure: /^\s*(true|1)\s*$/i.test(SECURE),
      bucket: BUCKET
    })

    const files = glob.sync(ENTRY)

    const rewriteRegexp = new RegExp(PATH_REWRITE)

    const tasks = files.map(async file => {
      const remoteFile = file.replace(rewriteRegexp, '')
      return client.put(REMOTE_DIR + remoteFile, file)
    })

    await Promise.all(tasks)
    core.setOutput('upload success\n', files.join('\n'))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
