import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UpdateAccounts } from './actions';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { Selectors } from './state/selectors';
import { errorToMessage } from './utils';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MessageService],
  imports: [RouterOutlet, TopNavComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly messageService = inject(MessageService);
  readonly account = toSignal(this.store.select(Selectors.account))

  ngOnInit(): void {
    this.store.dispatch(UpdateAccounts).subscribe({
      error: (error: Error) => {
        this.messageService.add(errorToMessage(error));
      }
    });
  }
  constructor(primeConfig: PrimeNGConfig) {
    primeConfig.ripple = true;
  }
}
