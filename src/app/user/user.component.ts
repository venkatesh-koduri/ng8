import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
  ) { }
  displayedColumns: string[] = ['username', 'role', 'modify', 'delete'];
  dataSource = new MatTableDataSource([]);
  usersList: any = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  userForm: FormGroup;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.loadUsers();
    this.createFormGroup();
  }

  loadUsers() {
    const url: string = '';
    const obj: any = {};
    this.httpClient.post(url, obj).subscribe(res => {
      if (res) {
        const data: any = res;
        if (data && data.length > 0) {
          this.usersList = data;
          this.dataSource.data = this.usersList;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filter = '';
        } else {
          this.usersList = [];
          this.dataSource.data = this.usersList;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filter = '';
        }
      } else {
        this.usersList = [];
        this.dataSource.data = this.usersList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = '';
      }
    }, error => {
      this.usersList = [];
      this.dataSource.data = this.usersList;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = '';
    })
  }

  createFormGroup() {
    this.userForm = this.formBuilder.group({
      username: this.formBuilder.control('', []),
      role: this.formBuilder.control('', []),
      id: this.formBuilder.control('', []),
    })
  }

  modifyForm(obj) {
    this.userForm.patchValue({
      username: obj.username,
      role: obj.role,
      id: obj.id,
    });
  }

  saveUser() {
    const url: string = 'api/user/create';
    const obj: any = {};
    obj.username = this.userForm.get('username').value;
    obj.role = this.userForm.get('role').value;
    obj.ismodify = 0;
    console.log(url,'-----',JSON.stringify(obj));
    this.httpClient.post(url, obj).subscribe(res => {
      
        console.log(res,'----------------');
      
    }, error =>{
      console.log(error,'-----------------');
    })
  }
  
  deleteForm(obj) {}
}
