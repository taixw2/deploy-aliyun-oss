<!-- <p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p> -->

# Deploy Aliyun OSS Action

Easily upload files to Aliyun OSS from GitHub Actions

## Usage

```yaml
steps:
- uses: actions/checkout@master
- uses: taixw2/deploy-aliyun-oss@v1
    with:
      # aliyun config
      region: oss-cn-hongkong.aliyuncs.com
      access-key-id: ${{ secrets.ACCESS_KEY_ID }}
      access-key-secret: ${{ secrets.ACCESS_KEY_SECRET }}
      bucket: ${{ secrets.BUCKET }}
      secure: true
      # deploy config
      entry: dist/**/* # glob pattern
      remote-dir: /
      path-rewrite: ^dist/
```

## Arguments

This action supports eight inputs from the user, most of which are required: `region`, `access-key-id`, `access-key-secret`, `bucket`, `secure`, `entry`, `remote-dir`, `path-rewrite`. Their descriptions and default values are listed below:

| Input             | Description                                                                       | Usage    | default      |
| ----------------- | --------------------------------------------------------------------------------- | -------- | ------------ |
| region            | the bucket data region location                                                   | Required |              |
| access-key-id     | access key you create on aliyun console website                                   | Required |              |
| access-key-secret | access secret you create                                                          | Required |              |
| bucket            | the default bucket you want to access If you don't have any bucket, please create | Required |              |
| secure            | instruct OSS client to use HTTPS (secure: true) or HTTP (secure: false) protocol  | Optional | true         |
| entry             | You need to upload files to OSS and support glob pattern                          | Optional | dist/\*\*/\* |
| remote-dir        | Directory path transferred to OSS                                                 | Optional | \\           |
| path-rewrite      | rewrite the entry path                                                            | Optional | \^dist/      |

## Example

```yaml
name: Example workflow for AliyunOSS
on: [push]
jobs:
  Release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
        with:
          fetch-depth: 2

      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Build Project
        run: npm install && npm run build

      - name: Deploy OSS
        uses: taixw2/deploy-aliyun-oss@v1
        with:
          # aliyun config
          region: oss-cn-hongkong.aliyuncs.com
          access-key-id: ${{ secrets.ACCESS_KEY_ID }}
          access-key-secret: ${{ secrets.ACCESS_KEY_SECRET }}
          bucket: ${{ secrets.BUCKET }}
          secure: true
          # deploy config
          entry: dist/**/* # glob pattern
          remote-dir: /
          path-rewrite: ^dist/
```
