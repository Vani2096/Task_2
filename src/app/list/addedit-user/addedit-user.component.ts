import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface Country {
  shortName: string;
  name: string;
}

@Component({
  selector: 'app-addedit-user',
  templateUrl: './addedit-user.component.html',
  styleUrls: ['./addedit-user.component.css']
})
export class AddeditUserComponent implements OnInit {
userForm!: FormGroup ;
actionButton:string = 'Save'
  // form!: FormGroup;
  // matcher:any = new MyErrorStateMatcher();

  // countries: Country[];
  // states?: string[];
  // cities?: string[];

  // country:any = new FormControl(null, [Validators.required]);
  // state = new FormControl({ value: null, disabled: true }, [
  //   Validators.required,
  // ]);
  // city = new FormControl({ value: null, disabled: true }, [
  //   Validators.required,
  // ]);

  constructor(private service: ApiService, private fb: FormBuilder, private matDialogueRef: MatDialogRef<AddeditUserComponent>, @Inject(MAT_DIALOG_DATA) public editData:any) {
    // this.countries = this.service.getCountries();
    // this.form = new FormGroup({
    //   country: this.country,
    //   state: this.state,
    //   city: this.city,
    // });
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['',Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })

   if(this.editData){
    this.actionButton = 'Update'
    this.userForm.controls['name'].setValue(this.editData.name),
    this.userForm.controls['phoneNumber'].setValue(this.editData.phoneNumber),
    this.userForm.controls['address'].setValue(this.editData.address),
    this.userForm.controls['state'].setValue(this.editData.state),
    this.userForm.controls['city'].setValue(this.editData.city)
   }

    // this.country.valueChanges.subscribe((country:any) => {
    //   console.log('send', country);
    //   this.state.reset();
    //   this.state.disable();
    //   if (country) {
    //     console.log('send', country);
    //     this.states = this.service.getStatesByCountry(country);
    //     this.state.enable();
    //   }
    // });

    // this.state.valueChanges.subscribe((state) => {
    //   this.city.reset();
    //   this.city.disable();
    //   if (state) {
    //     this.cities = this.service.getCitiesByState(this.country?.value, state);
    //     this.city.enable();
    //   }
    // });
  }
  getAllUser(){
    this.service.getUser().subscribe({
      next:(res)=> {
      }
    })
  }

  updateUser(){
this.service.putUser(this.userForm.value, this.editData.id).subscribe({
  next:(res)=>{
    this.getAllUser()
    this.userForm.reset();
    this.matDialogueRef.close();
  },
  error:(err)=> {
    alert(err)
  }
})
  }

addUser(){
if(this.userForm.valid){
  if(!this.editData){
    this.service.postUser(this.userForm.value).subscribe({
      next:(res)=> {
        this.getAllUser()
        this.userForm.reset();
        this.matDialogueRef.close();
        
      },
      error:(err)=> {
        alert(err)
      }
    })
  } else {
this.updateUser()
  }

}
  }
  close(){
    this.matDialogueRef.close();
  }

}
