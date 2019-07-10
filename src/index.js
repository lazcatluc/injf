const variablesToInject = {};

const FN_ARGS_FUNCTION = /^function\s*[^(]*\(\s*([^)]*)\)/m;
const FN_ARGS_LAMBDA = /^\s*\(?(.*?)\)?\s*=>/m;
const FN_ARG_SPLIT = /,/;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

const register = (name, fn) => {
  variablesToInject[name] = fn;
  return fn;
};

const findArguments = fnText => {
  const matches = fnText.match(FN_ARGS_FUNCTION); // finding arguments
  return matches ? matches[1] : fnText.match(FN_ARGS_LAMBDA)[1]; // finding lambda arguments
};

const resolve = fn => {
  let fnText = fn.toString(); // getting the source code of the function
  fnText = fnText.replace(STRIP_COMMENTS, ''); // stripping comments like function(/*string*/ a) {}
  const argumentsExpression = findArguments(fnText);
  const argNames = argumentsExpression.split(FN_ARG_SPLIT); // finding each argument name
  const newArgs = argNames.map(argName => {
    const trimmedArgName = argName.trim();
    if (variablesToInject[trimmedArgName] === undefined) {
      // the argument cannot be injected
      throw new Error(`Unknown argument: '${trimmedArgName}'. This cannot be injected.`);
    }
    return variablesToInject[trimmedArgName];
  });
  return fn(...newArgs);
};

export default { register, resolve };