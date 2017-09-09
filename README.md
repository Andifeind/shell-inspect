shell-inspect
=============

ShellInspect is a shell script testing library for node.js and the Mocha testing framework.

## Example:

```js
describe('cow say'() => {
  it('should say hello', () => {
    return shellInspect.cmd('cowsay "Hello World!"').test((ctx) => {
      inspect(ctx.exitCode).isEqual(0)
      inspect(ctx.stdout).doesContain('Hello World!')
    })
  })
})
```

## Methods

### .cmd(*str* command) - Set the command which should get tested

Defines the command which one should get tested. Add here the full command, including all parameters and options.

```js
shellInspect.cmd('git status -s').test(() => {

})
```

### .cwd(*str* workingDir) - Set working dir

Defines the current working dir. The working dir is set to `process.cwd()` per default.

### .test(*func* callback) - Callback method

Gets called when script had finished. The callback gets called with and context argument.

The context object has as few properties:

Property | Description
---------|------------
`exitCode` | Contains the shell scripts exit code
`pid` | The used process id
`text` | String representation of the shell output
`err` | Error message if anything went wrong
`stdout` | The output stream
`stderr` | The error stream
`runtime` | The script runtime as a Supertime duration object

```js
shellInspect.cmd('git status -s').test((ctx) => {
  inspect(ctx.exitCode).isEql(0)
})
```
