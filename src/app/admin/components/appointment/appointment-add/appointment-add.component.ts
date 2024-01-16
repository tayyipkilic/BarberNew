import { Component, EventEmitter, Output } from '@angular/core';
import { Appointment } from '../../../../models/appointment';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss',
})
export class AppointmentAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private appointmentService: AppointmentService
  ) {}

  createForm!: FormGroup;

  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();

  createAppointmentForm() {
    this.createForm = this.formBuilder.group({
      userId: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.createForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }

    let appointment: Appointment = { ...this.createForm.value };

    this.appointmentService.create(appointment).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.create-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
