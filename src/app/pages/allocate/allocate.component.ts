import { Component } from '@angular/core';
import { UserInputComponent } from "../user-input/user-input.component";
import { JsonPipe, NgFor } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IpTableComponent } from '../ip-table/ip-table.component';


export interface IpCount {
  id: number,
  name: string,
  userCount: number
}

@Component({
  selector: 'app-allocate',
  standalone: true,
  imports: [UserInputComponent, NgFor, FormsModule, ReactiveFormsModule, JsonPipe, IpTableComponent],
  templateUrl: './allocate.component.html',
  styleUrl: './allocate.component.css'
})
export class AllocateComponent {

  ipBaseObject = this.formBuilder.group({
    fieldCount: [''],
    ipCounts: this.formBuilder.array([]),
  });

  counts: number = 0;
  classTypeMessage: string = '';
  userInputIpaddress: string = '';
  ipCheckMsg: string = '';
  className: string = '';
  subnetMask: string = '';

  tableData: any[] = [];
  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.addNewLine();
  }

  addNewLine() {
    this.ipCounts.push(new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      userCount: new FormControl(0),
    }))
  }

  get ipCounts() {
    return this.ipBaseObject.get('ipCounts') as FormArray;
  }

  save() {
    console.table(this.ipCounts.value);
  }

  generateClassType() {
    this.counts = 0;
    for (let i = 0; i < this.ipCounts.length; i++) {
      const userCount = parseInt(this.ipCounts.at(i).get('userCount')?.value);
      if (!isNaN(userCount)) {
        this.counts += userCount;
      }
    }
    if (this.counts <= 254) {
      this.className = "C";
      this.classTypeMessage = "Class C is the best class for your network.";
    } else if (this.counts <= 65534) {
      this.className = "B";
      this.classTypeMessage = "Class B is the best class for your network.";
    } else if (this.counts <= 16777214) {
      this.className = "A";
      this.classTypeMessage = "Class A is the best class for your network.";
    }
  }

  checkUserInputIp() {

    let splitIp = this.userInputIpaddress.split(".");

    let classCUpperBound: number = 223;
    let classCLowerBound: number = 192;
    let classBUpperBound: number = 191;
    let classBLowerBound: number = 128;
    let classAUpperBound: number = 127;
    let classALowerBound: number = 0;

    
    if (this.className === "C") {
      if (parseInt(splitIp[0]) >= classCLowerBound && parseInt(splitIp[0]) <= classCUpperBound) {
        this.ipCheckMsg = "The ip you seleted is" + this.userInputIpaddress;
        this.subnetMask = "255.255.255.0";
        this.setIpAddress();
      } else {
        this.ipCheckMsg = "Your ip is not valid.Please enter valid ip."

      }
    } else if (this.className === "B") {
      if (parseInt(splitIp[0]) >= classBLowerBound && parseInt(splitIp[0]) <= classBUpperBound) {
        this.ipCheckMsg = "The ip you seleted is" + this.userInputIpaddress;
        this.subnetMask = "255.255.0.0";
      } else {
        this.ipCheckMsg = "Your ip is not valid.Please enter valid ip."
      }
    } else if (this.className === "A") {
      if (parseInt(splitIp[0]) >= classALowerBound && parseInt(splitIp[0]) <= classAUpperBound) {
        this.ipCheckMsg = "The ip you seleted is" + this.userInputIpaddress;
        this.subnetMask = "255.0.0.0";
      } else {
        this.ipCheckMsg = "Your ip is not valid.Please enter valid ip."
      }
    }
  }

  setIpAddress() {
    let sortarray: number[] = [];
    for (let i = 0; i < this.ipCounts.length; i++) {
        let userC = parseInt(this.ipCounts.at(i).get('userCount')?.value);
        sortarray.push(userC);
    }

    let newSortArray: number[] = sortarray.sort((a, b) => a - b);
    let reverseArray: number[] = newSortArray.reverse();
    console.log(reverseArray);

    let blocksizearray: number[] = [];
    for (let i = 0; i < reverseArray.length; i++) {
        let size = this.nextPowerOfTwoSpecial(reverseArray[i]);
        blocksizearray.push(size);
    }
    console.log(blocksizearray);

    let NetworkAddressArray: string[] = [];
    let BroadcastAddressArray: string[] = [];
    let firstUsableIpArray: string[] = [];
    let lastUsableIpArray: string[] = [];
    let splitip1: string[] = this.userInputIpaddress.split(".");
    let splitip2: string[] = this.userInputIpaddress.split(".");
    let splitip3: string[] = this.userInputIpaddress.split(".");
    let splitip4: string[] = this.userInputIpaddress.split(".");
    console.log(splitip1);

    let networkAddresslastvalue = parseInt(splitip1[3]);
    let broadcastAddresslastvalue = parseInt(splitip2[3]);
    let firstUsableIp = parseInt(splitip3[3]);
    let lastUsableIp = parseInt(splitip4[3]);
    NetworkAddressArray.push(this.userInputIpaddress);

    for (let i = 0; i < blocksizearray.length; i++) {
      firstUsableIp = networkAddresslastvalue+1;
      networkAddresslastvalue += blocksizearray[i];
      broadcastAddresslastvalue = networkAddresslastvalue-1;
      lastUsableIp = broadcastAddresslastvalue-1;

        splitip1[3] = networkAddresslastvalue.toString();
        splitip2[3] = broadcastAddresslastvalue.toString();
        splitip3[3] = firstUsableIp.toString();
        splitip4[3] = lastUsableIp.toString();
        let networkIps = splitip1[0] + "." + splitip1[1] + "." + splitip1[2] + "." + splitip1[3];
        let broadcastIps = splitip2[0] + "." + splitip2[1] + "." + splitip2[2] + "." + splitip2[3];
        let firstUsableIpAddres = splitip3[0] + "." + splitip3[1] + "." + splitip3[2] + "." + splitip3[3];
        let lastUsableIpAddress = splitip4[0] + "." + splitip4[1] + "." + splitip4[2] + "." + splitip4[3];
        
        NetworkAddressArray.push(networkIps);
        BroadcastAddressArray.push(broadcastIps);
        firstUsableIpArray.push(firstUsableIpAddres);
        lastUsableIpArray.push(lastUsableIpAddress);

        this.tableData.push({
          department: this.ipCounts.at(i).get('name')?.value,
          userCount: reverseArray[i],
          blockSize: blocksizearray[i],
          networkAddress: NetworkAddressArray[i],
          firstUsableIp: firstUsableIpAddres,
          lastUsableIp: lastUsableIpAddress,
          broadcastAddress: broadcastIps
        });
    }
    let add = NetworkAddressArray[NetworkAddressArray.length-1];
    let ddd = add.split('.');
    let kk = parseInt(ddd[3]);
    kk+= blocksizearray[blocksizearray.length-1]-1;
    ddd[3] = kk.toString();
    BroadcastAddressArray.push(ddd[0]+"."+ddd[1]+"."+ddd[2]+"."+(ddd[3]));
    

    console.log("Network addresses :",NetworkAddressArray);
    console.log("Broad addresses :",BroadcastAddressArray);
    console.log("First usable addresses :",firstUsableIpArray);
    console.log("Last usable addresses :",lastUsableIpArray);
}


  














nextPowerOfTwoSpecial(n: number): number {

    if (n <= 0) {
      throw new Error("Number must be greater than zero.");
    }

    // Function to check if a number is a power of two
    function isPowerOfTwo(x: number): boolean {
      return (x & (x - 1)) === 0;
    }

    // Find the next power of two
    let power = 1;
    while (power <= n) {
      power <<= 1;
    }

    // Check if the given number is one less than a power of two
    if (isPowerOfTwo(n + 1)) {
      power <<= 1; // Get the power of two after the next
    }

    return power;
  
  }




} 
