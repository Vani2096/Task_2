import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddeditUserComponent } from './addedit-user/addedit-user.component';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  deletePopup: boolean = false;
  constructor(private service: ApiService, public dialog: MatDialog, private alerService: AlertService) { }


  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.service.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  displayedColumns: string[] = ['name', 'phoneNumber', 'address', 'state', 'city', 'actions'];
  dataSource: any = new MatTableDataSource<any>;
  data: any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(AddeditUserComponent, {
      width: '30%',
      data: user
    }).afterClosed().subscribe(val => {
      this.getAllUser();
    });
  }

  deletePopupOpen(row: any) {
    this.service.deleteUser(row.id).subscribe({
      next: (res) => {
        this.getAllUser();
        this.alerService.success('Deleted Successfully')
        setTimeout((res: any) => {
          this.alerService.clear();
        }, 1000);
      }
    })
  }

  openDialogue() {
    const dialogRef = this.dialog.open(AddeditUserComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser();
    });
  }
}
