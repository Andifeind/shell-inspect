const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const ShellInspect = require('../../../src/core/ShellInspect')

describe('ShellInspect', () => {
  describe('instance', () => {
    it('creates a ShellInspect instance', () => {
      const shellInspect = new ShellInspect()
      inspect(shellInspect).isInstanceOf(ShellInspect)
    })
  })

  describe('cwd()', () => {
    it('sets a working dir', () => {
      const shellInspect = new ShellInspect()
      shellInspect.cwd('/tmp/foo')

      inspect(shellInspect.workingDir).isEql('/tmp/foo')
    })

    it('sets a relative working dir', () => {
      const shellInspect = new ShellInspect()
      shellInspect.cwd('../fixtures/scripts')

      inspect(shellInspect.workingDir).isEql(path.join(__dirname, '../fixtures/scripts'))
    })
  })

  describe('cmd()', () => {
    it('sets a command', () => {
      const shellInspect = new ShellInspect()
      shellInspect.cmd('foo')

      inspect(shellInspect.command).isEql('foo')
    })
  })

  describe('test()', () => {
    let execStub
    let sandbox
    let shellInspect

    beforeEach(() => {
      shellInspect = new ShellInspect()
      sandbox = sinon.sandbox.create()
      execStub = sandbox.stub(shellInspect, '_exec')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('calls a commandline and returns the output', () => {
      execStub.yields(null, 'Hello World', null)

      shellInspect.cwd('../../fixtures/scripts/')
      shellInspect.cmd('./hello')

      return shellInspect.test(() => {
        inspect(execStub).wasCalledOnce()
        inspect(execStub).wasCalledWith('./hello')
      })
    })
  })
})
