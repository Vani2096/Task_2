import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddeditUserComponent } from './list/addedit-user/addedit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Level Two';

  constructor(public dialog: MatDialog, private router: Router){  }

  ngOnInit() {
  
  }




}
