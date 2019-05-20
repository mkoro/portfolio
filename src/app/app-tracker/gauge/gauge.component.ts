import { Gauge } from './gauge';
import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements AfterViewInit, OnChanges {
  @ViewChild('gauge1')
  gaugeOneElement: ElementRef;

  @ViewChild('gauge2')
  gaugeTwoElement: ElementRef;

  @Input()
  firstValue: number;

  @Input()
  secondValue: number;

  gaugeOne: any;
  gaugeTwo: any;

  target = 2000;

  gaugeOpts = {
    angle: 0,
    pointer: {
      length: 0.9,
      strokeWidth: 0.035,
      color: '#444'
    },
    staticZones: [
     {strokeStyle: '#F03E3E', min: 0, max: 800},
     {strokeStyle: '#FFAA00', min: 800, max: 1600},
     {strokeStyle: '#30B32D', min: 1600, max: this.target}
    ],
    strokeColor: '#E0E0E0'
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.firstValue && this.gaugeOne) {
      this.gaugeOne.set(changes.firstValue.currentValue);
    }
    if (changes.secondValue && this.gaugeTwo) {
      this.gaugeTwo.set(changes.secondValue.currentValue);
    }
  }

  ngAfterViewInit() {
    this.gaugeOne = this.gaugeInit(
      this.gaugeOneElement.nativeElement,
      this.gaugeOpts,
      this.target,
      0,
      32,
      this.firstValue
    );
    this.gaugeTwo = this.gaugeInit(
      this.gaugeTwoElement.nativeElement,
      this.gaugeOpts,
      this.target,
      0,
      32,
      this.secondValue
    );
  }

  gaugeInit(gaugeElement, gaugeOpts, maxValue, minValue, animationSpeed, currentValue) {
    const gaugeObject: any = new Gauge(gaugeElement).setOptions(gaugeOpts);
    gaugeObject.maxValue = maxValue;
    gaugeObject.minValue = minValue;
    gaugeObject.animationSpeed = animationSpeed;
    gaugeObject.set(currentValue);

    return gaugeObject;
  }

}
