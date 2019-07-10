import argumentResolver from './argumentResolver';

const dependenciesContainer = {};

const register = (name, fn) => {
  dependenciesContainer[name] = fn;
  return fn;
};

const resolve = fn => {
  const newArgs = argumentResolver(fn).map(argName => {
    if (dependenciesContainer[argName] === undefined) {
      throw new Error(`Unknown argument: '${argName}'. This cannot be injected.`);
    }
    return dependenciesContainer[argName];
  });
  return fn(...newArgs);
};

export default { register, resolve };