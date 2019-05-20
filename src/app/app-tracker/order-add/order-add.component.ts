import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { Order, Product } from '../orders';

@Component({
  selector: 'order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit, OnChanges {
  @Input()
  callback: Function;

  @Input()
  currentOrders: Order[];

  existingOrderIds: String[] = [];

  Product = Product; // Needed to access enum from template

  formControls = {
    orderId: new FormControl('', [
      Validators.required,
      this.checkForExistingOrderId()
    ]),
    orderValue: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ])
  };

  selectedProduct = Product.a;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentOrders && changes.currentOrders.currentValue.length) {
      changes.currentOrders.currentValue.forEach(order => this.existingOrderIds.push(order.orderId));
    }
  }

  handleTypeSelect(event: MatRadioChange) {
    this.selectedProduct = event.value;
  }

  shouldDisableButton(): boolean {
    return !(this.formControls.orderId.valid && this.formControls.orderValue.valid);
  }

  checkForExistingOrderId(): ValidatorFn {
    return (control: AbstractControl) => {
      const forbidden = (this.existingOrderIds as any).includes(control.value); // Typescript failes to recognize Array.prototype.includes
      return forbidden ? {idAlreadyExists: {value: control.value}} : null;
    }
  }

  doneButton() {
    const newOrder: Order = {
      orderId: this.formControls.orderId.value,
      value: parseInt(this.formControls.orderValue.value),
      product: this.selectedProduct,
      attachments: [],
      comments: []
    }

    this.callback(newOrder);
  }

  cancelButton() {
    this.callback();
  }

}
