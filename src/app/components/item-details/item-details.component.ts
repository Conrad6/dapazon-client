import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Actions, Store } from '@ngxs/store';
import { BigNumberish, formatEther } from 'ethers';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { startWith } from 'rxjs';
import { DappazonNamespace } from '../../../models';
import { BuyProduct, FindProductDetails } from '../../actions';
import { EthPipe } from '../../pipes/eth.pipe';
import { Selectors } from '../../state/selectors';
import { errorToMessage, monitorAction } from '../../utils';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [FormsModule, ButtonModule, TagModule, DatePipe, EthPipe, RatingModule, SkeletonModule, DividerModule, ImageModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly messageService = inject(MessageService);
  private readonly actions = inject(Actions);
  private readonly allOrders = toSignal(this.store.select(Selectors.orders));
  readonly item = input.required<DappazonNamespace.ItemStruct>();
  readonly deliveryDate = new Date(Date.now() + 345600000);
  readonly orders = computed(() => {
    const allOrders = this.allOrders();
    if (!allOrders) return [];
    return allOrders.filter(o => o.item.id == this.item().id);
  })
  readonly buying = toSignal(
    monitorAction(this.actions, BuyProduct, () => true, () => false).pipe(
      startWith(false)
    )
  );
  readonly loadingDetails = toSignal(monitorAction(this.actions, FindProductDetails, () => true, () => false, true));

  ngOnInit(): void {
    this.store.dispatch(new FindProductDetails(this.item().id));
  }

  parseUnits(val: BigNumberish) {
    return Number(formatEther(val));
  }

  onBuyButtonClicked() {
    this.store.dispatch(new BuyProduct(this.item().id, this.item().cost)).subscribe({
      error: (error: Error) => {
        this.messageService.add(errorToMessage(error));
        console.error(error);
      },
      complete: () => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Transaction complete'
      })
    });
  }
}
