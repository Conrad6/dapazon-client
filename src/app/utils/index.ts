import { Message } from "primeng/api";

export function errorToMessage(error: Error) {
    return {
        severity: 'error',
        summary: 'Error',
        detail: error.message
    } as Message;
}
