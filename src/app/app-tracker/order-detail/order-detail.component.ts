import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Attachment, Order } from '../orders';

type KeyValuePair = {
  key: string;
  value: any;
};

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input()
  callback: Function;

  @Input()
  order: Order;

  displayedColumns = ['keys', 'values'];
  dataSource = new MatTableDataSource<KeyValuePair>([]);

  attDisplayedColumns = ['filename', 'delBut'];
  attDataSource = new MatTableDataSource<Attachment>([]);

  newComment: string;

  constructor() { }

  ngOnInit() {
    if (this.order) {
      const keyValuePairs: KeyValuePair[] = [];
      keyValuePairs.push({
        key: 'Order ID:',
        value: this.order.orderId
      });
      keyValuePairs.push({
        key: 'Order Value:',
        value: this.order.value
      });
      keyValuePairs.push({
        key: 'Product:',
        value: this.order.product
      });

      this.dataSource.data = keyValuePairs;

      if (this.order.attachments.length) {
        this.attDataSource.data = this.order.attachments;
      }
    }
  }

  deleteFileEntry(filename: string) {
    this.order.attachments = this.order.attachments.filter(att => att.filename !== filename);
    this.attDataSource.data = this.order.attachments;
  }

  dateHelper(dateString: string): string {
    const d = new Date(dateString);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  submitButton() {
    this.order.comments.push({
      author: 'You',
      dateString: new Date().toISOString(),
      content: this.newComment
    });

    this.newComment = '';
  }

  backButton() {
    this.callback();
  }

}
