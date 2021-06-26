import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isSettingsTabDisplay: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isSettingsTabDisplay = false;
  }

  navigateToBuilder() {
    this.router.navigate(['/builder']);
  }
}
