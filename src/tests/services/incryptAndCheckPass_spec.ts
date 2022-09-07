import { incrypt } from '../../services/incryptPassService';
import { checkPlainPassword } from '../../services/checkPlainPassword';

describe('test incrypt and check password', () => {
  it('test incyrpt service', () => {
    const hash = incrypt('tawfeek');
    expect(hash).not.toEqual('tawfeek');
  });
  it('test checkplainPassword', () => {
    const hash = incrypt('tawfeek');
    const reuslt: boolean = checkPlainPassword('tawfeek', hash);
    expect(reuslt).toBeTrue();
  });
});
