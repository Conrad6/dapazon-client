import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { append, patch } from "@ngxs/store/operators";
import { from, groupBy, map, mergeMap, switchMap, tap, timer, toArray } from "rxjs";
import { AppState, ItemGroup } from "../../models";
import { AccountConnected, AccountDisconnected, AccountsChanged, FindProductDetails, BuyProduct, LoadItems, UpdateAccounts } from "../actions";
import { DappService } from "../services/dapp.service";
import { parseUnits } from "ethers";

const categories: Record<string, string> = {
    electronics: 'Electronics & Gadgets',
    clothing: 'Clothing & Jewelry',
    toys: 'Toys & Gaming'
}

@State<AppState>({
    name: 'dappazon',
    defaults: {
        connectedAccounts: [],
        store: {
            groups: [],
            orders: []
        }
    }
})
@Injectable()
export class DappazonState {
    private readonly dappService = inject(DappService);

    @Action(BuyProduct)
    onInitBuying(ctx: StateContext<AppState>, { id, price }: BuyProduct) {
        return from(this.dappService.doBuyProduct(id, price)).pipe(
            tap(() => ctx.dispatch(new FindProductDetails(id)))
        );
    }

    @Action(FindProductDetails)
    onFindProductDetails(ctx: StateContext<AppState>, { productId }: FindProductDetails) {
        return from(this.dappService.findCustomerOrder(productId)).pipe(
            tap(orders => {
                if (orders.length <= 0) return;
                ctx.setState(patch({
                    store: patch({
                        orders: orders.sort((a, b) => Number(b.time) - Number(a.time))
                    })
                }))
            })
        );
    }

    @Action(LoadItems)
    onLoadItems(ctx: StateContext<AppState>) {
        return from(this.dappService.getStoreListings()).pipe(
            switchMap(items => from(items)),
            groupBy(item => item.category),
            mergeMap(group$ => group$.pipe(
                toArray(),
                map(items => ({ key: group$.key, groupName: categories[group$.key], items } as ItemGroup))
            )),
            toArray(),
            tap(groups => ctx.setState(patch({
                store: patch({
                    groups
                })
            })))
        );
    }

    @Action(UpdateAccounts)
    onUpdateAccounts(ctx: StateContext<AppState>) {
        return from(this.dappService.getAvailableAccounts()).pipe(
            tap(accounts => ctx.patchState({ account: accounts[0], connectedAccounts: accounts })),
            tap(() => this.dappService.monitorAccountChanges())
        );
    }

    @Action(AccountsChanged)
    onAccountsChanged(ctx: StateContext<AppState>, { available, selected }: AccountsChanged) {
        const prevAddress = ctx.getState().account;

        if (!prevAddress && selected)
            ctx.dispatch(new AccountConnected(selected));
        else if (prevAddress && !selected)
            ctx.dispatch(AccountDisconnected);

        ctx.setState(patch({
            connectedAccounts: available,
            account: selected ?? available[0]
        }));
    }
}
