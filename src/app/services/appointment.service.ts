import { Injectable } from '@angular/core';
import { ExtendedBaseService } from './base/extended-base.service';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends ExtendedBaseService<Appointment> {
  override path: string = 'appointments';
}
