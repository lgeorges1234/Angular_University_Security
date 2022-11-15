import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

    form:FormGroup;

    errors:string[] = [];
    messagePerErrorCode = {
        min: 'The minimum length is 10 charachters',
        uppercase: 'At least one upper case character',
        digits: 'At least on numeric character',
    }

    constructor(private fb: FormBuilder, private authService: AuthService) {

        this.form = this.fb.group({
            email: ['test@gmail.com',Validators.required],
            password: ['Password10',Validators.required],
            confirm: ['Password10',Validators.required]
        });
    }

    ngOnInit() {

    }

    signUp() {
        const val = this.form.value;

        if (val.email && val.password && val.password == val.confirm) {
            this.authService.signUp(val.email, val.password)
                .subscribe(
                    () => console.log("User Created succesfully"),
                    response => this.errors = response.error.errors
                )
        }
    }
}
