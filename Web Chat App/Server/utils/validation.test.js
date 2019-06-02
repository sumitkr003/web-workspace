var expect = require('expect');

var {isRealString} = require('./validation.js');

describe('isRealString',()=>{
   it('should check a real string',()=>{
      var fakeString = isRealString("     ") ;
      expect(fakeString).toBe(false);
   });

   it('should reject other data types',()=>{
       var notaString = isRealString(123);
       expect(notaString).toBe(false);
   });

    it('should accept a real String',()=>{
        var str = isRealString("sumit");
        expect(str).toBe(true);
    });

});
