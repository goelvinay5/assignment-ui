import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddRecordDialogComponent } from './add-record-dialog/add-record-dialog.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
  providers: [ConfirmationService, MessageService],
  imports: [AddRecordDialogComponent, TableModule, ButtonModule],
  standalone: true
})

export class BlogListComponent implements OnInit {
  Blogs: Blog[] = [];
  selectedBlog: Blog = new Blog();
  displayAddRecordDialog: boolean = false;
  displayEditRecordDialog: boolean = false;
  constructor(private blogService: BlogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    console.log("ngOnInit");
    this.blogService.getBlogs().subscribe(Blogs => {
      this.Blogs = Blogs;
    });
  }

  deleteBlog(blogId: number) {
    //this.confirmationService.confirm({
    //  message: 'Are you sure you want to delete this blog?',
    //  accept: () => {
        this.blogService.deleteBlog(blogId).subscribe(() => {
          this.loadBlogs();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Blog deleted successfully'
          });
    //    });
    //  }
    });
  }
  

  // Method to open the dialog
  showAddRecordDialog() {
    console.log("showAddRecordDialog");
    this.selectedBlog= new Blog();
    this.displayAddRecordDialog = true;
  }

  // Method to close the dialog
  closeAddRecordDialog() {
    console.log("showAddRecordDialog");
    this.displayAddRecordDialog = false;
    this.loadBlogs();
  }

  saveRecordAndClose(newmdlRecord: Blog) {
    console.log("showAddRecordDialog");
    this.blogService.createBlog(newmdlRecord).subscribe((response) => {
      // Handle successful save
      this.closeAddRecordDialog();
      //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Material saved successfully' });
    }, (error) => {
      // Handle error
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error saving record' });
      console.error('Error saving record', error);
    });
  }

  openEditDialog(record: any) {
    console.log("openEditDialog:" + record['id']);
    this.selectedBlog['id'] = record['id'];
    this.selectedBlog['text'] = record['text'];
    this.selectedBlog.username = record['username'];
    this.selectedBlog.dateCreated = record['dateCreated'];
    this.displayEditRecordDialog = true;
  }
  // Method to close the dialog
  closeEditRecordDialog() {
    console.log("closeEditRecordDialog");
    this.displayEditRecordDialog = false;
    this.loadBlogs();
    this.selectedBlog = new Blog();
  }

  saveEditRecordAndClose(newmdlRecord: Blog) {
    console.log("saveEditRecordAndClose");
    this.blogService.updateBlog(newmdlRecord).subscribe((response) => {
      // Handle successful save
      this.closeEditRecordDialog();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Material edited successfully' });
    }, (error) => {
      // Handle error
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error editing record' });
      console.error('Error editing record', error);
    });
    this.selectedBlog = new Blog();
  }
}
