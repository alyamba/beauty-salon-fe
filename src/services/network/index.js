import ky from 'ky';
import { UserService } from './user';

export const api = ky.extend({
  timeout: 10000,
});

export * from './constants';
export { UserService };
