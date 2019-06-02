var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./Message');

describe('generateMessage',()=>{
    it('should generate correct Message objects',()=>{
        var from ="billy";
        var text = "hey there!!";
        var Message = generateMessage(from,text);

        expect(Message.createdAt).toBeA('number');
        expect(Message).toInclude({from,text});
    });
})

describe('generateLocationMessage',()=>{
   it('should generate current location objects',()=>{
      var from ="billy";
      var latitude = 15;
      var longitude = 20;
      var url = 'http://www.google.com/maps?q=15,20';
      var LocationMessage = generateLocationMessage(from,latitude,longitude);

      expect(LocationMessage.createdAt).toBeA('number');
      expect(LocationMessage).toInclude({from,url});
   });
});