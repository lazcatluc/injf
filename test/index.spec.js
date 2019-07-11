import inject from '../src';

describe('Inject should resolve', () => {
  
  afterEach(() => {
    inject.clear();
  });
  
  it('simple function', async () => {
    function simpleFunction(x) {
      return x + 1;
    }
    inject.register('x', 2);
    const result = await inject.resolve(simpleFunction);
    expect(result).toEqual(3);
  });
  
  it('complicated function', async () => {
    function complicatedFunction(x, y) {
      return x + y;
    }
    inject.register('x', 2);
    inject.register('y', 1);
    const result = await inject.resolve(complicatedFunction);
    expect(result).toEqual(3);
  });
  
  it('inline function', async () => {
    const inlineFunction = x => x + 1;
    inject.register('x', 2);
    const result = await inject.resolve(inlineFunction);
    expect(result).toEqual(3);
  });
  
  it('inline complicated function', async () => {
    const inlineComplicatedFunction = (x, y, z) => x + y + z;
    inject.register('x', 2);
    inject.register('y', 3);
    inject.register('z', 5);
    const result = await inject.resolve(inlineComplicatedFunction);
    expect(result).toEqual(10);
  });
  
  it('dependency name', async () => {
    inject.register('x', 2);
    expect(await inject.resolve('x')).toEqual(2);
  });
  
  it('inner dependencies', async () => {
    inject.register('sumSquare', inject.resolve(sum => sum * sum));
    inject.register('sum', inject.resolve((x, y) => x + y));
    inject.register('x', 1);
    inject.register('y', 2);
    const result = await inject.resolve('sumSquare');
    expect(result).toEqual(9);
  });
 
  it('async function', async () => {
    const asyncFn = async () => await 2;
    inject.register('x', asyncFn());
    const result = await inject.resolve(x => x + 1);
    expect(result).toEqual(3);
  });
});
