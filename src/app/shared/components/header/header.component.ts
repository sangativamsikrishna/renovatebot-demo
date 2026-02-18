import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string;
  role: string;
  @Input() isSignOutButton: boolean;
  // logo = assetUrl('/images/oneTlogo.png');
  logo = assetUrl('/images/clixlogoDark.png');

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.userName = this.storageService.getItem('UserName');
    this.role = this.storageService.getItem('role');
  }
  signOut() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
