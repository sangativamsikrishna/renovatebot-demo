import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-slider',
  templateUrl: './step-slider.component.html',
  styleUrls: ['./step-slider.component.scss']
})
export class StepSliderComponent implements OnInit {
  constructor() {
    alert('calling');
  }

  ngOnInit(): void {}
}
