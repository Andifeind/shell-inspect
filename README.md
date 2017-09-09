shell-inspect
=============

[![Build Status](https://travis-ci.org/Andifeind/shell-inspect.svg)](https://travis-ci.org/Andifeind/shell-inspect)

ShellInspect is a shell script testing library for node.js and the Mocha testing framework.

## Example:

```js
const inspect = require('inspectjs')
const shellInspect = require('shell-inspectjs')

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

Gets called when script has terminated. The callback method takes a context as its own argument.

#### callback(*obj* ctx)

Properties:

Property | Description
---------|------------
`exitCode` | Contains the shell scripts exit code
`pid` | The used process id
`text` | String representation of the shell output
`err` | Error message if anything went wrong
`stdout` | The output stream
`stderr` | The error stream
`runtime` | The script runtime as a Supertime duration object

#### Example:

```js
shellInspect.cmd('git status -s').test((ctx) => {
  inspect(ctx.exitCode).isEql(0)
})
```
