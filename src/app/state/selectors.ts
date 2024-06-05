import { Selector, createPropertySelectors } from "@ngxs/store";
import { AppState, DappazonNamespace, ItemGroup } from "../../models";
import { DappazonState } from "./dapp.state";
import { BigNumberish } from "ethers";

export class Selectors {
    private static dappazonSlices = createPropertySelectors<AppState>(DappazonState);

    @Selector([Selectors.dappazonSlices.store])
    static storeItems({ groups }: { groups: ItemGroup[] }) {
        return groups;
    }

    @Selector([Selectors.dappazonSlices.account])
    static account(acc?: string) {
        return acc;
    }

    @Selector([Selectors.dappazonSlices.store])
    static orders({ orders }: { orders: { item: DappazonNamespace.ItemStruct, time: BigNumberish }[] }) {
        return orders;
    }
}
