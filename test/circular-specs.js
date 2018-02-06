import glanceJSON from '../src';

describe('Circular', () => {
    it('should work with a circular reference to an object', () => {
        let obj = {
        }

        obj.a = obj;

        glanceJSON(obj, "a")
    });

    it('should work with a circular reference to an array', () => {
       let arr = [1];
       arr.push(arr)

        glanceJSON(arr, "1");
    })
})