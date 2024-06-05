import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { from, tap } from "rxjs";
import { AppState } from "../../models";
import { AccountConnected, AccountDisconnected, AccountsChanged, LoadItems, LoadedStoreItems, UpdateAccounts } from "../actions";
import { DappService } from "../services/dapp.service";

@State<AppState>({
    name: 'dappazon',
    defaults: {
        connectedAccounts: []
    }
})
@Injectable()
export class DappazonState {
    private readonly dappService = inject(DappService);

    @Action(LoadItems)
    onLoadItems(ctx: StateContext<AppState>) {
        return from(this.dappService.getStoreListings()).pipe(
            tap(output => ctx.dispatch(new LoadedStoreItems(output)))
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
