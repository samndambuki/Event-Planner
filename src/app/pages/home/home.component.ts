import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoginView: boolean = true
  registerObj: any = {
    "UserId": 0,
    "Name": "",
    "Email": "",
    "Password": "",
    "ContactNo": "",
    "Role": ""
  }

  loginObj: any = {
    "Password": "",
    "ContactNo": ""
  }

  constructor(private http: HttpClient) { }

  openLogin() {
    const modal = document.getElementById("myModal")
    if (modal != null) {
      modal.style.display = 'block'
    }
  }

  closeModal() {
    const modal = document.getElementById("myModal")
    if (modal != null) {
      modal.style.display = 'none'
    }
  }

  //methods to make api call
  onRegister() {
    const url = 'https://freeapi.miniprojectideas.com/api/EventBooking/CreateUser'
    this.http.post(url, this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Registration Success')
        this.closeModal()
      } else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    const url = 'https://freeapi.miniprojectideas.com/api/EventBooking/Login'
    this.http.post(url, this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('Login Success')
        //store login details to local storage
        //local storage will always store in string format
        //event user is the key
        localStorage.setItem('eventUser', JSON.stringify(res.data))
        this.closeModal()
      } else {
        alert(res.message)
      }
    })
  }

}
