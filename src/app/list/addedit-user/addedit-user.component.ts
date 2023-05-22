import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/alert.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-addedit-user',
  templateUrl: './addedit-user.component.html',
  styleUrls: ['./addedit-user.component.css']
})
export class AddeditUserComponent implements OnInit {
  userForm!: FormGroup;
  actionButton: string = 'Save';
  userRole: string = 'Add User';

  constructor(private service: ApiService, private fb: FormBuilder, private matDialogueRef: MatDialogRef<AddeditUserComponent>, @Inject(MAT_DIALOG_DATA) public editData: any,
    private alerService: AlertService) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })

    if (this.editData) {
      this.actionButton = 'Update';
      this.userRole = 'Edit User'
      this.userForm.controls['name'].setValue(this.editData.name),
        this.userForm.controls['phoneNumber'].setValue(this.editData.phoneNumber),
        this.userForm.controls['address'].setValue(this.editData.address),
        this.userForm.controls['state'].setValue(this.editData.state),
        this.userForm.controls['city'].setValue(this.editData.city)
    }
  }

  getAllUser() {
    this.service.getUser().subscribe({
      next: (res) => {
      },
      error: (err) => {
        this.alerService.error(err)
        setTimeout((res: any) => {
          this.alerService.clear();
        }, 1000);
      }
    })
  }

  updateUser() {
    this.service.putUser(this.userForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.getAllUser()
        this.userForm.reset();
        this.matDialogueRef.close();
        this.alerService.success('Updated Successfully')
        setTimeout((res: any) => {
          this.alerService.clear();
        }, 1000);
      },
      error: (err) => {
        this.alerService.error(err)
        setTimeout((res: any) => {
          this.alerService.clear();
        }, 1000);
      }
    })
  }

  addUser() {
    if (this.userForm.valid) {
      if (!this.editData) {
        this.service.postUser(this.userForm.value).subscribe({
          next: (res) => {
            this.getAllUser()
            this.userForm.reset();
            this.matDialogueRef.close();
            this.alerService.success('Created Successfully')
            setTimeout((res: any) => {
              this.alerService.clear();
            }, 1000);
          },
          error: (err) => {
            this.alerService.error(err)
            setTimeout((res: any) => {
              this.alerService.clear();
            }, 1000);
          }
        })
      } else {
        this.updateUser()
      }
    }
  }

  close() {
    this.matDialogueRef.close();
  }

}
