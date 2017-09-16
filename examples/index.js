const ShellInspect = require('../src/core/ShellInspect')
const shellInspect = new ShellInspect()

shellInspect
  .cwd('../test/fixtures/scripts/')
  .cmd('./hello')
  .test((ctx) => {
    ctx.print()
  }).then(() => {

  }).catch((err) => {
    console.error(err)
  })
