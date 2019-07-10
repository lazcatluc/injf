const FN_ARGS_FUNCTION = /^function\s*[^(]*\(\s*([^)]*)\)/m;
const FN_ARGS_LAMBDA = /^\s*\(?(.*?)\)?\s*=>/m;
const FN_ARG_SPLIT = /,/;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

const findArguments = fnSourceCode => {
  const matches = fnSourceCode.match(FN_ARGS_FUNCTION);
  return matches ? matches[1] : fnSourceCode.match(FN_ARGS_LAMBDA)[1];
};

export default fn => {
  let fnSourceCode = fn.toString();
  fnSourceCode = fnSourceCode.replace(STRIP_COMMENTS, '');
  return findArguments(fnSourceCode)
    .split(FN_ARG_SPLIT)
    .map(argName => argName.trim());
};