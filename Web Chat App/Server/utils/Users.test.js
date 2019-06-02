const expect = require('expect');

const {Users} = require('./Users');

describe('Users',()=>{
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'cse'
        }, {
            id: '2',
            name: 'Jen',
            room: 'it'
        }, {
            id: '3',
            name: 'Julie',
            room: 'cse'
        }];
    });

   it('should add a new user',()=>{
       var users = new Users();
       var user = {
           id:123,
           name:'sumit',
           room:'fifa'
       };

       var resuser = users.adduser(user.id,user.name,user.room);

       expect(users.users).toEqual([user]);
   })

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for cse course', () => {
        var userList = users.getUserList('cse');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for it course', () => {
        var userList = users.getUserList('it');

        expect(userList).toEqual(['Jen']);
    });
});