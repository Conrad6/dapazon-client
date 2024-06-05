import { BigNumberish } from 'ethers';
import { DappazonNamespace } from './Dappazon';

export * from './Dappazon';
export type ItemGroup = {
    groupName: string;
    key: string;
    items: DappazonNamespace.ItemStruct[];
}
export type AppState = {
    account?: string;
    connectedAccounts: string[];
    store: {
        groups: ItemGroup[];
        orders: {
            time: BigNumberish;
            item: DappazonNamespace.ItemStruct;
        }[]
    }
}
