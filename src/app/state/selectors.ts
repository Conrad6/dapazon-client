import { Selector, createPropertySelectors } from "@ngxs/store";
import { DappazonState } from "./dapp.state";
import { AppState, DappazonNamespace } from "../../models";

export class Selectors {
    private static dappazonSlices = createPropertySelectors<AppState>(DappazonState);

    @Selector([Selectors.dappazonSlices.account])
    static account(acc?: string) {
        return acc;
    }
}
