import { api, BASE_API } from '.';
import { log } from '../utils';

export class MasterService {
  static endpoints = {
    add: '/master/add',
    addWeekSlot: '/master/addWeekSlot',
    addSlot: '/master/addSlot',
    disableSlot: '/master/disableSlot',
    edit: '/master/edit',
    getMasterProcedure: '/master/getMasterProcedure',
    getById: '/master/getById',
    getAll: '/master/getAll',
    remove: '/master/remove',
  };
}
