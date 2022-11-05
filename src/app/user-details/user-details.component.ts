import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ICountry } from '../interfaces/country';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  form = this.fb.group({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    profileCompletion: new FormControl(null, [Validators.required]),
    lastConnection: new FormControl(''),
  });
  countries!: ICountry[]
  readonly: boolean = true;
  profileCompletionValue!: number;

  constructor(private route: ActivatedRoute, private service: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: any) => {
      const userId = params.id;
      this.getDetails(userId);
    })
    this.getCountries()
  }

  getDetails(id: string) {
    this.subscription = this.service.getUserDetails(id).subscribe((res) => {
      this.profileCompletionValue = res.profileCompletion;
      this.form.patchValue(res)
      this.form.patchValue({lastConnection: moment(res.lastConnection).format('YYYY/MM/DD HH:mm')}); 
    })
  }

  getCountries() {
    this.service.getCountries().subscribe((res) => {
      this.countries = res;
    })
  }

  switchMode(readonly: boolean) {
    this.readonly = readonly;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
