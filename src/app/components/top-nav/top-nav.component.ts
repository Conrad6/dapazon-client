import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Selectors } from '../../state/selectors';
import { SlicePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink, ButtonModule, InputTextModule, SlicePipe],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent {
  private store = inject(Store);
  readonly account = toSignal(this.store.select(Selectors.account));
  readonly categories: MenuItem[] = [
    {
      label: 'Clothing & Jewelry',
      id: 'clothing'
      // routerLink: ''
    },
    {
      label: 'Electronics & Gadgets',
      id: 'electronics'
      // routerLink: ''
    },
    {
      label: 'Toys & Gaming',
      id: 'toys'
    }
  ]
}
