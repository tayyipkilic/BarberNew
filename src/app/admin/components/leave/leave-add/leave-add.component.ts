import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../../../services/leave.service';
import { Leave } from '../../../../models/leave';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './leave-add.component.html',
  styleUrl: './leave-add.component.scss',
})
export class LeaveAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private leaveService: LeaveService
  ) {}

  leaveForm!: FormGroup;

  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();

  createForm() {
    this.leaveForm = this.formBuilder.group({
      userId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.leaveForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }

    let leave: Leave = { ...this.leaveForm.value };

    this.leaveService.create(leave).subscribe((res) => {
      if (typeof document == undefined) return;
      document.querySelector('.create-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
