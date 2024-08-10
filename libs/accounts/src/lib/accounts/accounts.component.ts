import { Component } from '@angular/core';
import {
  DatatableComponent,
  TextInputComponent,
} from '@budget-insights/components';

@Component({
  selector: 'bi-accounts',
  standalone: true,
  imports: [DatatableComponent, TextInputComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  headers = ['Name', 'Website', 'Type'];
  records: Record<string, string>[] = [
    {
      Name: 'Associated Checking',
      Website: 'https://www.associatedbank.com',
      Type: 'Checking',
    },
    {
      Name: 'Associated Savings',
      Website: 'https://www.associatedbank.com',
      Type: 'Savings',
    },
    {
      Name: 'Associated Credit',
      Website: 'https://www.chase.com',
      Type: 'Credit',
    },
    {
      Name: 'Discover',
      Website: 'https://www.discover.com',
      Type: 'Credit',
    },
    {
      Name: 'American Express',
      Website: 'https://global.americanexpress.com',
      Type: 'Credit',
    },
    {
      Name: 'PayPal',
      Website: 'https://paypal.com',
      Type: 'Credit',
    },
    {
      Name: 'Capital One',
      Website: 'https://global.americanexpress.com',
      Type: 'Credit',
    },
  ];
}
