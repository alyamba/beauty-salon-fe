import { api, BASE_API } from '.';
import { log } from '../utils';

export class OrderService {
  static endpoints = {
    create: '/order/create',
    confirm: '/order/confirm',
    getAllByUser: '/order/getAllByUser',
  };
}
