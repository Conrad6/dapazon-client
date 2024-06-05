import { DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, model, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Actions, Store, ofActionCompleted, ofActionDispatched } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { identity, map, merge, mergeMap, startWith, tap } from 'rxjs';
import { DappazonNamespace } from '../../../models';
import { BuyProduct, LoadItems } from '../../actions';
import { ItemDetailsComponent } from '../../components/item-details/item-details.component';
import { EthPipe } from '../../pipes/eth.pipe';
import { Selectors } from '../../state/selectors';
import { errorToMessage } from '../../utils';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [ItemDetailsComponent, DecimalPipe, DialogModule, FormsModule, DividerModule, ButtonModule, RatingModule, TagModule, CardModule, SkeletonModule, EthPipe],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {
  private store = inject(Store);
  private actions = inject(Actions);
  private messageService = inject(MessageService);
  readonly previewTarget = signal<DappazonNamespace.ItemStruct | undefined>(undefined);
  readonly showPreviewDialog = model(false);
  readonly storeItems = toSignal(this.store.select(Selectors.storeItems));
  readonly loadingStoreItems = toSignal(merge([
    this.actions.pipe(
      ofActionDispatched(LoadItems),
      map(() => true)
    ),
    this.actions.pipe(
      ofActionCompleted(LoadItems),
      tap(outcome => {
        if (outcome.result.error) {
          this.messageService.add(errorToMessage(outcome.result.error));
        }
      }),
      map(() => false),
    )
  ]).pipe(
    mergeMap(identity)
  ));
  readonly previewDialogDismissable = toSignal(
    merge([
      this.actions.pipe(
        ofActionDispatched(BuyProduct),
        map(() => false)
      ),
      this.actions.pipe(
        ofActionCompleted(BuyProduct),
        map(() => true)
      )
    ]).pipe(
      mergeMap(identity),
      startWith(true)
    )
  );

  // constructor() {
  //   effect(() => {
  //     if (this.storeItems() && !this.loadingStoreItems()) {
  //       this.showPreviewDialog.set(true);
  //       this.previewTarget.set(this.storeItems()?.at(0)?.items.at(0));
  //     } else {
  //       this.showPreviewDialog.set(false);
  //       this.previewTarget.set(undefined);
  //     }
  //   }, { allowSignalWrites: true });
  // }

  onPreviewItemButtonClicked(item: DappazonNamespace.ItemStruct) {
    this.previewTarget.set(item);
    this.showPreviewDialog.set(true);
  }

  onPreviewDialogClose() {
    this.previewTarget.set(undefined);
  }

  ngOnInit(): void {
    this.store.dispatch(LoadItems);
  }
}
