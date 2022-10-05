import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  active: boolean = true;

  constructor(public _loadingService: LoadingService) {
    this._loadingService.loading$.subscribe((res) => {
      this.active = res;
    });
  }

  ngOnInit(): void {}
}
