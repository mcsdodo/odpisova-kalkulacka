import { doSomething } from "./Utils";

test('test something', () => {
    const something = doSomething(1);

    expect(something).toEqual(1)
});
