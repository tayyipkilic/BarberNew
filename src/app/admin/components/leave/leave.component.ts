import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveAddComponent } from './leave-add/leave-add.component';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../models/leave';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, LeaveAddComponent, LeaveUpdateComponent],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss',
})
export class LeaveComponent implements OnInit {
  constructor(private leaveService: LeaveService) {}

  leaves: Leave[] = [];
  selectedLeave!: Leave;

  @ViewChild(LeaveAddComponent, { static: true })
  addLeaveComponent!: LeaveAddComponent;
  @ViewChild(LeaveUpdateComponent, { static: true })
  updateLeaveComponent!: LeaveUpdateComponent;

  getAll() {
    this.leaveService.getAll().subscribe((res) => {
      this.leaves = res.data;
    });
  }

  showAddModal() {
    this.addLeaveComponent.createForm();
  }

  showEditModal(leave: Leave) {
    this.updateLeaveComponent.updateForm(leave);
  }

  deleteUserById(id: number) {
    this.leaveService.deleteById(id).subscribe();
  }

  ngOnInit(): void {
    this.getAll();
  }
}
