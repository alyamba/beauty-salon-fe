import ky from 'ky';
import { UserService } from './user';
import { CategoryService } from './category';
import { MasterService } from './master';
import { OrderService } from './order';
import { ProcedureService } from './procedure';
import { SlotService } from './slot';

export const api = ky.extend({
  timeout: 10000,
});

export * from './constants';
export {
  UserService,
  CategoryService,
  MasterService,
  OrderService,
  ProcedureService,
  SlotService,
};
