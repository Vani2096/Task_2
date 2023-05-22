import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/alert.service';
import { ApiService } from '../shared/api.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private service: ApiService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear()
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.service.logIn(this.form.value)
        .subscribe({
            next: () => {
                this.router.navigate(['/user']);
                this.alertService.clear()
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
    
    }
}