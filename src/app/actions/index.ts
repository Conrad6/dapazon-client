import { DappazonNamespace } from "../../models";

const prefix = '[Dappazon]';
export class AccountsChanged {
    static type = `[Dappazon] Accounts changed`;
    constructor(readonly available: string[] = [], readonly selected?: string) { }
}

export class LoadItems {
    static type = `${prefix} Load Items`;
}

export class LoadedStoreItems {
    static type = `${prefix} Items loaded`;
    constructor(readonly items: DappazonNamespace.ItemStruct[]) { }
}

export class AccountConnected {
    static type = '[Dappazon] Account Connected';
    constructor(readonly address: string) { }
}

export class AccountDisconnected {
    static type = '[Dappazon] Account Disconnected';
}

export class UpdateAccounts {
    static type = '[Dappazon] Update Accounts';
}
