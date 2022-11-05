import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { IUser } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  users!: IUser[];
  userColumns = ['id', 'firstname', 'lastname'];
  filters = ['lastname']
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.subscription = this.service.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  search(event: Event, column: any) {
    let queryString = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    if (queryString !== "") {
      this.users = this.users.filter((user: any) => {
        return user[column].toLocaleLowerCase().match(queryString);
      });
    } else {
      this.getUsers();
    }
  }

  showConnectedUsers(checked: boolean) {
    if (checked) {
      this.users = this.users.filter((user: any) => {
        return user.alreadyConnected === checked;
      })
    } else {
      this.getUsers();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
