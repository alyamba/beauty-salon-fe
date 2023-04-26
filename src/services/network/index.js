import ky from 'ky';
import { UserService } from './user';
import { CategoryService } from './category';
import { MasterService } from './master';
import { OrderService } from './order';
import { ProcedureService } from './procedure';
import { SlotService } from './slot';
import { AdminService } from './admin';

export const api = ky.extend({
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('content-type', 'application/json');
        console.log('request: ', request);
        return ky(request);
      },
    ],
  },
});

export * from '../utils/constants';
export {
  UserService,
  CategoryService,
  MasterService,
  OrderService,
  ProcedureService,
  SlotService,
  AdminService,
};
