import { api, BASE_API } from '.';
import { log } from '../utils';

export class OrderService {
  static endpoints = {
    create: '/order/create',
    confirm: '/order/confirm',
    getAllByUser: '/order/getAllByUser',
  };

  static async createOrder(master = {}, date = '', user = {}, procedure = {}) {
    try {
      console.log(
        JSON.stringify({
          master,
          date,
          user,
          procedure,
        }),
      );
      const response = await api.post(`${BASE_API}${this.endpoints.create}`, {
        body: JSON.stringify({
          master,
          date,
          user,
          procedure,
        }),
      });
      const data = await response.json();
      log('api-success', '[PROCEDURE] Get All', data);
      return data;
    } catch (error) {
      log('api-error', '[PROCEDURE] Get All: ', error);
      throw error;
    }
  }
}
