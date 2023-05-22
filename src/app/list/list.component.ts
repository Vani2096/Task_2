import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddeditUserComponent } from './addedit-user/addedit-user.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: ApiService, public dialog: MatDialog ){  }


  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    this.service.getUser().subscribe({
      next:(res)=> {
      this.dataSource= new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      }
    })
  }
  displayedColumns: string[] = ['name', 'phoneNumber', 'address', 'state', 'city', 'actions'];
  dataSource:any = new MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUser(user:any){
    const dialogRef = this.dialog.open(AddeditUserComponent, {
      width : '30%',
      data:user
    }).afterClosed().subscribe(val => {
      this.getAllUser();
    });
  }

  deleteUser(user: any) {
    this.service.deleteUser(user.id).subscribe({
      next:(res)=> {
      }
    })
  }

  openDialogue(){
    const dialogRef = this.dialog.open(AddeditUserComponent, {
      width : '30%'
    });
      dialogRef.afterClosed().subscribe(result => {
        this.getAllUser();
      });
    }
}



export interface PeriodicElement {
  name: any;
  phoneNumber: any;
  address: any;
  state: string;
  city:string;
  actions:any;
}



