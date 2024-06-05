import { BigNumberish } from "ethers";
import { DappazonNamespace } from "../../models";

const prefix = '[Dappazon]';
export class AccountsChanged {
    static type = `[Dappazon] Accounts changed`;
    constructor(readonly available: string[] = [], readonly selected?: string) { }
}

export class LoadItems {
    static type = `${prefix} Load Items`;
}

export class AccountConnected {
    static type = '[Dappazon] Account Connected';
    constructor(readonly address: string) { }
}

export class AccountDisconnected {
    static type = '[Dappazon] Account Disconnected';
}

export class BuyProduct {
    static type = `${prefix} Buy Product`;
    constructor(readonly id: BigNumberish, readonly price: BigNumberish) { }
}

export class UpdateAccounts {
    static type = '[Dappazon] Update Accounts';
}

export class FindProductDetails {
    static type = `${prefix} Find Product Details`;
    constructor(readonly productId: BigNumberish) { }
}

export class ProductDetailsFetched {
    static type = `${prefix} Product Details`;
    constructor(readonly order?: { time: BigNumberish, item: DappazonNamespace.ItemStruct }) { }
}
