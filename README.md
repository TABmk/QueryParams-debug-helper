### Simple script for debug purpose

include it on top of \<head\>:
`<script src="_def.js"></script>`

Only one function is public:
`_def(name, value)`

`name` — `String` — search param key

`value` — `Any` — default variable value

```
_def('speed', 10)
=> returns 'speed' query param or 10
```

```
_def('speed')
=> returns 'speed' query param or false
```

#### Examples:
```
> https://localhost/?speed=123
> _def('speed', 10)
=> 123
```

```
> https://localhost/
> _def('speed', 10)
=> 10
```

```
> https://localhost/
> _def('speed')
=> false
```

### Params editor included:
By opening page with `editor` param (Ex.: https://localhost/?editor)
Page will be replaced with editor

It just print input for each configured key with its type.
And by submiting form, it will forward you to page with your params

### How to configure editor:

Create global variable and call it `OPTIONS`
And fill object

( `HTMLInputTypeAttribute` = https://www.w3schools.com/tags/att_input_type.asp )
```
{
  [key: string]: {
    type: HTMLInputTypeAttribute
  }
}
```

Example:
```
const OPTIONS = {
  speed: {
    type: 'number'
  },
  difficulty: {
    type: 'text'
  },
  final: {
    type: 'checkbox'
  }
}
```

After finishing debug you can just remove this lib

And if you dont want to change code declare new varibale

`const _def = (a, b = false) => b;`

it will just return your default values or false
