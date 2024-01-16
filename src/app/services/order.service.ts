import { Injectable } from '@angular/core';
import { ExtendedBaseService } from './base/extended-base.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ExtendedBaseService<Order> {
  override path: string = 'orders';
}
