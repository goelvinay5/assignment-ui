import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from "primeng/api";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-record-dialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrl: './add-record-dialog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, CalendarModule]
})
export class AddRecordDialogComponent implements OnInit {
  @Input() visible: boolean = false; // To receive the visibility flag from the parent
  @Input() originalRecord: Blog = new Blog();  // To store the original state
  @Output() visibleChange = new EventEmitter<void>(); // To notify the parent to close the dialog
  @Output() onSave = new EventEmitter<Blog>();  // To notify the parent to save the record
  @Output() onSaveAndClose = new EventEmitter<Blog>();  // To notify the parent to save the record
  addRecordForm!: FormGroup;
  isEditMode = false;
  newmdlRecord: Blog = new Blog();
  // Initialize newRecord and originalRecord
  initNewRecord(initValues: Partial<Blog> = {}) {
    this.newmdlRecord = new Blog(initValues);
    this.originalRecord = new Blog(initValues); // Store the initial state
  }
  // Check if any changes have been made
  hasUnsavedChanges(): boolean {
    return JSON.stringify(this.newmdlRecord) !== JSON.stringify(this.originalRecord);
  }

  constructor(private fb: FormBuilder, private blogService: BlogService, private primengConfig: PrimeNGConfig) {

  }
  ngOnInit() {
    this.addRecordForm = this.fb.group({
      id:[0],
      username: ['', Validators.required],
      text: ['', Validators.required],
      dateCreated: ['', Validators.required]
    });
  }
  // Method to close the dialog
  closeDialog() {
    //this.visible = false;
    this.visibleChange.emit();
    this.resetDialog();
  }
  showDialog() {
    this.visible = true;
    //this.visibleChange.emit(); // Emit change to parent
    //this.addRecordForm = this.fb.group(this.newmdlRecord);

    if (this.originalRecord['id'] != 0) {
      console.log("showDialog: " + this.originalRecord['id']);
      console.log("showDialog: " + this.originalRecord['dateCreated']);
      console.log("showDialog: " + this.originalRecord['username']);
      console.log("showDialog: " + this.originalRecord['text']);
      this.newmdlRecord = { ...this.originalRecord };
      this.addRecordForm.controls['id'].setValue(this.newmdlRecord['id']);
      this.addRecordForm.controls['username'].setValue(this.newmdlRecord['username']);
      this.addRecordForm.controls['text'].setValue(this.newmdlRecord['text']);
      let date = new Date(this.newmdlRecord['dateCreated'] ? this.newmdlRecord['dateCreated'] : Date.now());
      this.addRecordForm.controls['dateCreated'].setValue(date);
    }
  }
  saveRecordAndClose() {
    this.newmdlRecord = this.addRecordForm.value;
    this.onSaveAndClose.emit(this.newmdlRecord);
    this.visibleChange.emit();
    this.resetDialog();
  }

  // Method to save the record
  saveRecord() {
    this.newmdlRecord = this.addRecordForm.value;
    this.onSave.emit(this.newmdlRecord);
    this.visibleChange.emit();
    this.resetDialog();
  }
  okClick() {
    this.visibleChange.emit();
  }

  // Method to handle dialog close
  //onHide() {
  //  this.visible = false;
  //  //this.visibleChange.emit();
  //  this.newmdlRecord = new Blog();
  //}

  resetDialog() {
    this.newmdlRecord = new Blog();
    this.addRecordForm.controls['id'].setValue('');
    this.addRecordForm.controls['username'].setValue('');
    this.addRecordForm.controls['text'].setValue(' ');
    this.addRecordForm.controls['dateCreated'].setValue('');
  }

}


