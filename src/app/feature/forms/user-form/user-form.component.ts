import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Role } from 'src/app/interface/dto/role';
import { User } from 'src/app/interface/dto/user';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
    @Input() roleArray?: Role[]
    @Input() userForm!: FormGroup
    constructor () {}
}
