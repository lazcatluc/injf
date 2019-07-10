import argumentResolver from './argumentResolver';

const DEFAULT_MAX_WAIT = 60000;

let dependenciesContainer = {};

const register = (name, fn) => {
  dependenciesContainer[name] = fn;
  return fn;
};

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

const resolveAsyncFunction = async (fn, maxWait = DEFAULT_MAX_WAIT) => {
  const newArgs = await Promise.all(argumentResolver(fn).map(name => resolveAsyncDependency(name, maxWait)));
  return fn(...newArgs);
};

const resolveAsyncDependency = async (name, maxWait = DEFAULT_MAX_WAIT) => {
  let count = 0;
  const pause = 100;
  do {
    let dependency = dependenciesContainer[name];
    if (dependency === undefined) {
      await sleep(pause);
    } else {
      return dependency;
    }
    count++;
  } while(count <= maxWait / pause);
  throw new Error(`Undefined dependency '${name}'.`);
};

const resolve = async (arg, maxWait = DEFAULT_MAX_WAIT) => {
  if (typeof arg === 'function') {
    return await resolveAsyncFunction(arg, maxWait);
  }
  return await resolveAsyncDependency(arg, maxWait);
};

const clear = () => {
  dependenciesContainer = {};
};

export default { register, resolve, clear };