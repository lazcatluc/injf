## Introduction

`injf` is a minimal, unassuming, dependency injection container focused on
functional patterns rather than OOP ones. It features lazy resolution of 
dependencies via promises and is designed to inject parameters into 
your functions based on their name. You can inject everything you like
but `injf` is designed with a stateless functional-style mindset. 

## Installation

`injf` can be installed via npm:
```
$ npm install injf
```

## Examples

Let's say you have a `sum` function and you want to evaluate it using
injected `x` and `y` values. 
```
function sum(x, y) {
  return x + y;
}
```

You must have (anywhere) a section that is executed that registers `x`
and `y` with the container.

```
injf.register('x', 3);
injf.register('x', 2);
injf.register('y', 1);
```

Note that you can register the same dependency multiple times. 
The last value will be used.

```
const result = await injf.resolve(sum);
expect(result).toEqual(3);
```

Due to lazy loading, you must use `await` or some other Promise-resolution
method in order to obtain the actual result.

You can combine dependencies by calling `register` and `resolve` 
at the same time
```
injf.register('sumSquare', injf.resolve(sum => sum * sum));
injf.register('sum', injf.resolve((x, y) => x + y));
injf.register('x', 1);
injf.register('y', 2);
const result = await injf.resolve('sumSquare');
expect(result).toEqual(9);
```

Note that `await` must only be called when getting the result, 
not when registering dependencies. If you called `await` inside the
`sumSquare` registration section, you'd get an error as `sum` is not
yet known to the container. 

No circular dependencies are currently supported. 