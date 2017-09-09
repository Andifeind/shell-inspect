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
