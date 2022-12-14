import { store_users, user } from '../../models/user';
let userid = 1;
const users = new store_users();

describe('test user model', () => {
  it('test user index returning data', async () => {
    const result = await users.index();
    expect(result).toBeDefined();
  });

  it('test user create data', async () => {
    const newuser: user = {
      id: 0,
      firstname: 'tawfik',
      lastname: 'shalash',
      password: '12',
    };
    const result = await users.create(newuser);
    userid = result;
    expect(result).toBeGreaterThan(0);
  });

  it('test show user', async () => {
    const result = await users.show(userid);
    expect(result).toEqual({
      id: userid,
      firstname: 'tawfik',
      lastname: 'shalash',
      password: '12',
    });
  });

  it('test user update', async () => {
    const newuser: user = {
      id: userid,
      firstname: 'mohammed',
      lastname: 'shalash',
      password: '12',
    };
    const result = await users.update(newuser);
    expect(result).toEqual({
      id: userid,
      firstname: 'mohammed',
      lastname: 'shalash',
      password: '12',
    });
  });

  it('test show user after update', async () => {
    const result = await users.show(userid);
    expect(result).toEqual({
      id: userid,
      firstname: 'mohammed',
      lastname: 'shalash',
      password: '12',
    });
  });
  it('test delete user', async () => {
    const resultbefore = await users.index();
    await users.delete(userid);
    const result = await users.index();
    expect(result.length).toBeLessThan(resultbefore.length);
  });
});
