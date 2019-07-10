import argumentResolver from './argumentResolver';

const dependenciesContainer = {};

const register = (name, fn) => {
  dependenciesContainer[name] = fn;
  return fn;
};

const resolveFunction = fn => {
  const newArgs = argumentResolver(fn).map(argName => {
    if (dependenciesContainer[argName] === undefined) {
      throw new Error(`Unknown argument: '${argName}'. This cannot be injected.`);
    }
    return dependenciesContainer[argName];
  });
  return fn(...newArgs);
};

const resolveDependency = name => dependenciesContainer[name];

const resolve = arg => {
  if (typeof arg === 'function') {
    return resolveFunction(arg);
  }
  return resolveDependency(arg);
};

export default { register, resolve };