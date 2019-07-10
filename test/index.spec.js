import inject from '../src';

describe('Inject should resolve', () => {
  it('simple function', () => {
    function simpleFunction(x) {
      return x + 1;
    }
    inject.register('x', 2);
    const result = inject.resolve(simpleFunction);
    expect(result).toEqual(3);
  });
  
  it('complicated function', () => {
    function complicatedFunction(x, y) {
      return x + y;
    }
    inject.register('x', 2);
    inject.register('y', 1);
    const result = inject.resolve(complicatedFunction);
    expect(result).toEqual(3);
  });
  
  it('inline function', () => {
    const inlineFunction = x => x + 1;
    inject.register('x', 2);
    const result = inject.resolve(inlineFunction);
    expect(result).toEqual(3);
  });
  
  it('inline complicated function', () => {
    const inlineComplicatedFunction = (x, y, z) => x + y + z;
    inject.register('x', 2);
    inject.register('y', 3);
    inject.register('z', 5);
    const result = inject.resolve(inlineComplicatedFunction);
    expect(result).toEqual(10);
  });
  
  it('dependency name', () => {
    inject.register('x', 2);
    expect(inject.resolve('x')).toEqual(2);
  })
});
