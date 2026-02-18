import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private toastrService: ToastrService) {}

  successAlert(message) {
    this.toastrService.success(message, 'Success!');
  }

  errorAlert(message) {
    this.toastrService.error(message, 'error');
  }

  warningAlert(message) {
    this.toastrService.warning(message, 'warning!');
  }
}
