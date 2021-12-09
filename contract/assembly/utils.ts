import { context } from "near-sdk-core";

/**
 * Account ID of transaction sender.
 */
export type AccountID = string;

/* Generates a unique ID */
export function getID(): string {
  return `${context.blockTimestamp}-${context.blockIndex}`;
}
