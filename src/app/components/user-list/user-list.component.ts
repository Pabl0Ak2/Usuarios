import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  isEditing: boolean = false; 
  selectedUser: any = null;  
  newUser = {                
    name: '',
    email: '',
    phone: '',
    company: { name: '' },
  };
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser(): void {
    if (this.newUser.name && this.newUser.email && this.newUser.phone) {
      const userToAdd = { ...this.newUser };
      this.users.push(userToAdd);
      this.resetForm();
    }
  }

  editUser(user: any): void {
    this.isEditing = true;
    this.selectedUser = user;
    this.newUser = { ...user };
  }

  saveUser(): void {
    if (this.selectedUser) {
      Object.assign(this.selectedUser, this.newUser);
      this.resetForm();
    }
  }

  deleteUser(index: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.users.splice(index, 1);
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedUser = null;
    this.newUser = { name: '', email: '', phone: '', company: { name: '' } };
  }
}
