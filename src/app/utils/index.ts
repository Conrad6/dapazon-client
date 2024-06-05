import { ActionCompletion, ActionType, Actions, ofActionCompleted, ofActionDispatched } from "@ngxs/store";
import { Message } from "primeng/api";
import { identity, map, merge, mergeMap, startWith } from "rxjs";

export function errorToMessage(error: Error) {
    return {
        severity: 'error',
        summary: 'Error',
        detail: error.message
    } as Message;
}

export function monitorAction<TAction extends ActionType, R>(actions$: Actions, action: TAction, dispatchMapper?: (action: TAction) => R, completionMapper?: (completion: ActionCompletion<TAction>) => R, initialValue?: R) {
    if (initialValue === undefined) {
        return merge([
            actions$.pipe(
                ofActionDispatched(action),
                map(a => {
                    if (dispatchMapper) return dispatchMapper(a);
                    return;
                })
            ),
            actions$.pipe(
                ofActionCompleted(action),
                map(a => {
                    if (completionMapper) return completionMapper(a);
                    return;
                })
            )
        ]).pipe(
            mergeMap(identity),
            startWith(initialValue)
        )
    } else {
        return merge([
            actions$.pipe(
                ofActionDispatched(action),
                map(a => {
                    if (dispatchMapper) return dispatchMapper(a);
                    return;
                })
            ),
            actions$.pipe(
                ofActionCompleted(action),
                map(a => {
                    if (completionMapper) return completionMapper(a);
                    return;
                })
            )
        ]).pipe(
            mergeMap(identity),
        )
    }
}
