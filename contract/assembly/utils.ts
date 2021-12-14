import { context, datetime } from "near-sdk-core";

/**
 * Account ID of transaction sender.
 */
export type AccountID = string;

/* Limits */
export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 160;
export const MIN_DESCRIPTION_LENGTH = 15;
export const MIN_TITLE_LENGTH = 10;

/* Definitions */
export const RatingsKeys: Set<String> = new Set()
export const RecipeCategorys: Set<String> = new Set()
RecipeCategorys.add("dinner")
RecipeCategorys.add("breakfast")
RecipeCategorys.add("lunch")
RecipeCategorys.add("dessert")
RecipeCategorys.add("snacks")
RatingsKeys.add("one")
RatingsKeys.add("oneAndAHalf")
RatingsKeys.add("two")
RatingsKeys.add("twoAndAHalf")
RatingsKeys.add("three")
RatingsKeys.add("threeAndAHalf")
RatingsKeys.add("four")
RatingsKeys.add("fourAndAHalf")
RatingsKeys.add("five")
RatingsKeys.add("fourAndAHalf")

/* Generates a unique ID */
export function getID(): string {
  return `${context.blockTimestamp}-${context.blockIndex}`;
}

/*  Get current date */
export function getCurrentDate(): string {
  return datetime.block_datetime().toString().split("T")[0]
}