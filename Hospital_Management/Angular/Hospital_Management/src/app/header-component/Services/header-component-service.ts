import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderComponentService {

  private departmentUrl = "https://localhost:7173/api/Department";

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<any> {

    return this.http.get(this.departmentUrl);

  }

}
