import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddeditUserComponent } from './list/addedit-user/addedit-user.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task_2';

  constructor(public dialog: MatDialog){  }

  ngOnInit() {
  
  }




}
