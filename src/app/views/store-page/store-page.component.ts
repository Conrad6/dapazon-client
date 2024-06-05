import { Component, OnInit, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { DividerModule } from 'primeng/divider';
import { Selectors } from '../../state/selectors';
import { LoadItems, LoadedStoreItems } from '../../actions';
import { map, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { errorToMessage } from '../../utils';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {
  private store = inject(Store);
  private actions = inject(Actions);
  private messageService = inject(MessageService);
  readonly storeItems = toSignal(this.actions.pipe(
    ofActionCompleted(LoadedStoreItems),
    tap(({ result }) => {
      if (result.error) {
        this.messageService.add(errorToMessage(result.error))
      }
    }),
    map(({ action }) => {
      return action.items;
    })
  ));

  constructor() {
    effect(() => {
      console.log(this.storeItems());
    })
  }

  ngOnInit(): void {
    this.store.dispatch(LoadItems);
  }
}
