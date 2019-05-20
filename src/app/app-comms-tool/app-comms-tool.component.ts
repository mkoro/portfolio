import { Component, HostListener, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatRadioChange, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { InfoDialog } from '../info-dialog.component';
import { Customer, sampleCustomers } from './customers';

// Type definitions come here

type FormControlStore = {
  serviceCheckboxes: boolean[],
  comRefControl: FormControl,
  priorityControl: FormControl,
  dynamicControl: FormControl,
  summaryControl: FormControl
}

type SerializedFormControlStore = {
  serviceCheckboxes: boolean[],
  comRefControl: string,
  priorityControl: string,
  dynamicControl: string,
  summaryControl: string
}

// This will be a container format for our historical entries
type HistoricalEntry = {
  uniqueId: string,
  commsType: CommsType,
  selectedCustomers: Customer[],
  formControls: SerializedFormControlStore
}

enum CommsType {
  A,
  B,
  C,
  D
}

@Component({
  selector: 'app-app-comms-tool',
  templateUrl: './app-comms-tool.component.html',
  styleUrls: ['./app-comms-tool.component.scss']
})
export class AppCommsToolComponent implements OnInit, AfterViewInit {
  escape = escape; // So that we can access escape() from our template

  // This holds the state of our form
  formControls: FormControlStore = {
    serviceCheckboxes: [false, false, false, false, false],
    comRefControl: new FormControl(''),
    priorityControl: new FormControl(''),
    dynamicControl: new FormControl(''),
    summaryControl: new FormControl('')
  };

  // Some imaginary historical entries
  entryList: HistoricalEntry[] = [{
    uniqueId: '0000000001',
    commsType: CommsType.A,
    selectedCustomers: [
      { id: 2, name: 'Cisor', emails: [''] }
    ],
    formControls: {
      serviceCheckboxes: [false, false, true, false, false],
      comRefControl: 'COM0000231',
      priorityControl: 'Priority 2',
      dynamicControl: 'Demo Field',
      summaryControl: 'Historical summary would go\nhere'
    }
  },{
    uniqueId: '0000000002',
    commsType: CommsType.B,
    selectedCustomers: [
      { id: 4, name: 'Archicious', emails: [''] },
      { id: 5, name: 'Dulane', emails: [''] }
    ],
    formControls: {
      serviceCheckboxes: [true, true, false, false, true],
      comRefControl: 'COM0000165',
      priorityControl: 'Priority 3',
      dynamicControl: '',
      summaryControl: 'Some text should\nProbably go here'
    }
  }];

  // We will now set up a very simple DataSource to feed our table with historical data.
  // In real life, this would implement the DataSource<T> abstract class, take care of
  // asynchronously loading our historical entries from the server (maybe as a JSON object),
  // constructing actual HistoricalEntry objects from the data, and returning them in an array.
  dataSource = new MatTableDataSource<HistoricalEntry>(this.entryList);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Columns to show in our historical entry list
  displayedColumns = ['comRef', 'commsType', 'priority', 'delBut'];

  serviceList = [];
  priorityList = [];

  commsType = CommsType.A;

  customers: Customer[] = sampleCustomers;
  selectedCustomers: Customer[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    [1, 2, 3, 4, 5].forEach(i => {
      this.serviceList.push(`Service ${i}`);
      this.priorityList.push(`Priority ${i}`);
    }); // Prepare dummy lists

    // Display validation errors by default
    this.formControls.priorityControl.markAsTouched();
    this.formControls.comRefControl.markAsTouched();
  }

  ngAfterViewInit() {
    // Hook up table and paginator
    this.dataSource.paginator = this.paginator;
  }

  // Load a serialized historical entry as our new state
  loadFormData(entry: HistoricalEntry) {
    this.commsType = entry.commsType;
    this.selectedCustomers = entry.selectedCustomers;
    this.formControls = {
      serviceCheckboxes: entry.formControls.serviceCheckboxes,
      comRefControl: new FormControl(entry.formControls.comRefControl),
      priorityControl: new FormControl(entry.formControls.priorityControl),
      dynamicControl: new FormControl(entry.formControls.dynamicControl),
      summaryControl: new FormControl(entry.formControls.summaryControl)
    };
  }

  // Delete given entry from historical list. In real life, this
  // would also modify our database on the server. Also updates our
  // datasource observable.
  deleteHistoryEntry(event: Event, id: string) {
    event.stopPropagation(); // Make sure click doesn't load the row

    for (let i = this.entryList.length - 1; i >= 0; i--) {
      if (this.entryList[i].uniqueId === id) {
        this.entryList.splice(i, 1);
        break;
      }
    }

    this.dataSource.data = this.entryList; // Update table view
  }

  handleTypeSelect(event: MatRadioChange) {
    this.commsType = parseInt(event.value);
  }

  addCustomersFromList() {

    const list = document.getElementById('customerSelect') as HTMLSelectElement;

    const selectedNames = this.getSelectValues(list);

    selectedNames.forEach(name => {
      this.selectedCustomers.push( this.getCustomerByName(name) );
    });

    this.clearSelectValues(list);

  }

  getSelectValues(sel: HTMLSelectElement): string[] {
    const result = [];
    const options = sel && sel.options;
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(unescape(opt.value));
      }
    }
    return result;
  }

  removeSelectedCustomers() {
    const list = document.getElementById('selectedDisplay') as HTMLSelectElement;

    const selectedNames = this.getSelectValues(list);

    this.selectedCustomers = this.selectedCustomers.filter(customer => !selectedNames.includes(customer.name));

    this.clearSelectValues(list);
  }

  addAll() {
    this.selectedCustomers = this.customers.filter(_ => true);
  }

  removeAll() {
    this.selectedCustomers = [];
  }

  clearSelectValues(sel: HTMLSelectElement) {
    const options = sel && sel.options;
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        opt.selected = !opt.selected;
      }
    }

  }

  getCustomerByName(name: string): Customer {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].name === name) {
        return this.customers[i];
      }
    }

    return undefined;
  }

  commsTypeHelper(no: number): string {
    return CommsType[no];
  }

  importFile() {
    document.getElementById('files').click();
  }

  handleFileSelect(evt) {
    const files = evt.target.files as FileList;

    const fr = new FileReader();

    fr.onloadend = () => {
      this.importFileFinishedLoading(fr.result as string);
    };

    fr.readAsText( files[0].slice() );
  }

  importFileFinishedLoading(text: string) {
    let imported = null;
    try {
      imported = JSON.parse(text);
    } catch {
      return;
    }

    if (imported.length && imported[0].id) {
      this.selectedCustomers = imported;
    }
  }

  exportFile() {
    let exportString = JSON.stringify(this.selectedCustomers);

    const blob = new Blob([exportString], { type: 'text/plain;charset=utf-8' });
    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveBlob(blob, 'export.txt');
    } else {
      const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement;
      link.href = URL.createObjectURL(blob);
      link.download = 'export.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  showAppInfo() {
    this.dialog.open(InfoDialog, {
      data: {
        title: 'What am I looking at?',
        content: ['This application is a simulation of a customer notification tool which I created for enterprise use.', 'The application helps service desk agents to quickly select which customers should receive the notification, as well as provide data validation to ensure that all mandatory information is present in the final message. The tool also saves earlier messages, making the sending of updates and amendments a breeze.', 'Feel free to play around with the various options and their effects!', 'Tip: click on one of the pre-saved notifications near the bottom of the page to quickly fill all the fields with sample data.']
      }
    });
  }

  showSendInfo() {
    this.dialog.open(InfoDialog, {
      data: {
        title: 'What does the Send button do?',
        content: ['In the real-world counterpart of this application, it would trigger the sending of a mass e-mail communication to the selected customers, containing all the information provided above, and automatically generated into a nice-looking branded template.', 'In the case of this demo application, however, it does exactly one thing: nothing.']
      }
    });
  }

  send() {}

}
