import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GWT_COMMAND, Command, selectItem } from '../Utils/Command';
import { EventListner, EVENT_NAME } from '../Utils/EventListner';
import { DeviceComponent } from '../Utils/device';
import { DEVICE_CURD_OPREATION, DeviceCurd } from '../Utils/DeviceDetails';

declare global {
  interface Window {
    CircuitJS1: any; // Replace `any` with a more specific type if known
  }
}

interface CircuitComponent {
  type: string;   // Define the type of the component, e.g., resistor, capacitor
  data: string[]; // Define additional data for the component
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  cmd = GWT_COMMAND;
  subCirLis: DeviceComponent[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    EventListner.addEvent(EVENT_NAME.SELECTION_CHANGE, () => {
      this.changeDetectorRef.detectChanges();
    });
    // Initialize the subCirLis from DeviceCurd
    this.subCirLis = DeviceCurd.getItems();
    console.log("subCirList==>", this.subCirLis);
  }

  ngOnInit(): void {
    this.checkCircuitJS1();
  }
  
  checkCircuitJS1() {
    const interval = setInterval(() => {
      if (window['CircuitJS1']) {
        clearInterval(interval);
        console.log('CircuitJS1 is available:', window['CircuitJS1']);
      } else {
        console.log('Waiting for CircuitJS1...');
      }
    }, 100); // Check every 100ms
  }
      

  addDevice(d: Command) {
    if (window.CircuitJS1 && window.CircuitJS1.menuPerformed) {
      window.CircuitJS1.menuPerformed(d.name, d.value);
      selectItem(d);
    } else {
      console.error('CircuitJS1 or menuPerformed method is not available.');
    }
  }
  addCircuitToCanvas(circuitData: string): void {
    const CircuitJS1 = window['CircuitJS1'];
  
    if (CircuitJS1 && typeof CircuitJS1.importCircuit === 'function') {
      try {
        // Assuming circuitData is formatted correctly for import
        CircuitJS1.importCircuit(circuitData);
        console.log('Circuit successfully imported and displayed on the canvas.');
      } catch (error) {
        console.error('Error importing circuit:', error);
      }
    } else {
      console.error('CircuitJS1 or importCircuit method is not available.');
      console.log('Available methods on CircuitJS1:', Object.keys(CircuitJS1 || {}));
    }
  }
  

  openSubCir(cell_name: string) {
    try {
      // Retrieve the formatted circuit data from localStorage
      const formattedCircuitData = localStorage.getItem(cell_name);
      if (!formattedCircuitData) {
        console.error('No data found for cell name:', cell_name);
        return;
      }

      console.log('Formatted Circuit Data for', cell_name, ':', formattedCircuitData);

      // Process and display the circuit data
      this.importCircuitFromText(formattedCircuitData);
    } catch (error) {
      console.error('Error opening circuit:', error);
    }
  }

  importCircuitFromText(circuitText: string) {
    try {
      // Optionally, remove any unwanted characters or symbols
      if (circuitText.startsWith('$')) {
        circuitText = circuitText.substring(1).trim();
      }

      // Convert text to circuit object
      const circuitDataObject = this.convertToCircuitObject(circuitText);

      // Format the circuit data
      const formattedData = this.formatCircuitData(circuitDataObject);

      // Add the circuit to the canvas
      this.addCircuitToCanvas(formattedData);

      console.log('Circuit successfully imported and displayed on the canvas.');
    } catch (error) {
      console.error('Error importing circuit data:', error);
    }
  }

  convertToCircuitObject(text: string): CircuitComponent[] {
    // Implement conversion logic based on your data format
    const lines = text.split('\n');
    return lines.map(line => {
      const parts = line.trim().split(/\s+/);
      return { type: parts[0], data: parts.slice(1) };
    });
  }

  formatCircuitData(circuitDataObject: CircuitComponent[]): string {
    return circuitDataObject.map((item: CircuitComponent) => `${item.type} ${item.data.join(' ')}`).join('\n');
  }
}
