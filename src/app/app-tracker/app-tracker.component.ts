import { Component, ViewChild, AfterContentInit, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Order, sampleOrders, Product } from './orders';
import { InfoDialog } from '../info-dialog.component';

enum ViewMode {
  OrderList,
  OrderDetail,
  OrderAdd
}

@Component({
  selector: 'app-app-tracker',
  templateUrl: './app-tracker.component.html',
  styleUrls: ['./app-tracker.component.scss']
})
export class AppTrackerComponent implements AfterContentInit {
  entryList: Order[] = [];
  orderForDetail: Order;
  dataSource = new MatTableDataSource<Order>(this.entryList);
  displayedColumns = ['orderId', 'orderValue', 'product', 'delBut'];

  productASum = 0;
  productBSum = 0;

  viewMode = ViewMode.OrderList;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  orderAddCallback = (newOrder: Order) => {
    this.viewMode = ViewMode.OrderList;
    if (typeof(newOrder) === 'undefined' || newOrder === null) return;
    this.entryList.unshift(newOrder);
    this.updateTable();
  }

  orderDetailCallback = () => {
    this.viewMode = ViewMode.OrderList;
  }

  constructor(public dialog: MatDialog) { }

  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator;
    this.entryList = sampleOrders;
    this.updateTable();
  }

  showAppInfo() {
    this.dialog.open(InfoDialog, {
      data: {
        title: 'What am I looking at?',
        content: ['The real-world counterpart of this application enables teams and managers to record and track their progress again goals such as Key Performance Indicator targets', 'In the case of this demo, we have two targets to meet, and both involve striking deals for two different products to generate income according to a pre-defined target.', 'The gauge charts, which are updated live, offer a pleasing and intuitive way to immediately see the team\'s status when it comes to these goals.', 'Feel free to play around with the existing orders, as well as create some of your own!']
      }
    });
  }

  addButton() {
    this.viewMode = ViewMode.OrderAdd;
  }

  deleteOrderEntry(orderId) {
    this.entryList = this.entryList.filter(order => order.orderId !== orderId);
    this.updateTable();
  }

  loadOrderData(event: Event, order: Order) {
    event.stopImmediatePropagation();
    console.log(event);
    this.orderForDetail = order;
    this.viewMode = ViewMode.OrderDetail;
  }

  updateTable() {
    this.updateSums();
    this.dataSource.data = this.entryList;
  }

  updateSums() {
    let aSum = 0;
    let bSum = 0;
    this.entryList.forEach((order) => {
      order.product === Product.a ?
        aSum += order.value :
        bSum += order.value;
    });

    this.productASum = aSum;
    this.productBSum = bSum;
  }

}
