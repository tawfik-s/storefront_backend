import { store_users, user } from '../../models/user';

const users = new store_users();
describe('test user model', () => {
  it('test user index returning data', async () => {
    const result = await users.index();
    expect(result).toBeDefined();
  });

  it('test user create data', async () => {
    const newuser: user = {
      first_name: 'tawfik',
      last_name: 'shalash',
      password: '12',
    };
    const result = await users.create(newuser);
    expect(result).toBeTrue();
  });
  it('show user', async () => {
    const result = await users.show(1);
    expect(result).toEqual({
      id: 1,
      firstname: 'tawfik',
      lastname: 'shalash',
      password: '12',
    });
  });
});
