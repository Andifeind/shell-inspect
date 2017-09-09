'use strict'

const path = require('path')
const exec = require('child_process').exec
const supertime = require('supertime')


class ShellInspect {
  constructor() {
    this.workingDir = process.cwd()
  }

  cmd(command) {
    this.command = command
    return this
  }

  cwd(workingDir) {
    if (workingDir.startsWith('.')) {
      workingDir = path.resolve(path.dirname(module.parent.filename), workingDir)
    }

    this.workingDir = workingDir
    return this
  }

  test(fn) {
    return new Promise((resolve, reject) => {
      const opts = {
        env: process.env,
        cwd: this.workingDir
      }

      let child
      const timer = supertime.start()
      child = this._exec(this.command, opts, (err, stdout, stderr) => {
        const duration = timer.stop()
        if (err) {
          reject(err)
          return
        }

        const ctx = Object.assign({
          text: stdout,
          err: stderr,
          runtime: duration
        }, child)

        resolve(fn(ctx))
      })
    })
  }

  _exec() {
    const args = Array.prototype.slice.call(arguments)
    return exec.apply(null, args)
  }
}

module.exports = ShellInspect
