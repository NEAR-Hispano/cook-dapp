import { context, datetime } from "near-sdk-core";

/**
 * Account ID of transaction sender.
 */
export type AccountID = string;

/* Limits */
export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 160;
export const MIN_DESCRIPTION_LENGTH = 50;
export const MIN_TITLE_LENGTH = 30;

/* Definitions */
export type RecipeCategory = "dinner" | "breakfast" | "lunch" | "dessert" | "snacks";
export type RatingsKeys = "one" | "oneAndAHalf" | "two" | "twoAndAHalf" | "three" | "threeAndAHalf" | "four" | "fourAndAHalf" | "five";

/* Generates a unique ID */
export function getID(): string {
  return `${context.blockTimestamp}-${context.blockIndex}`;
}

/*  Get current date */
export function getCurrentDate(): string {
  return datetime.block_datetime().toString().split("T")[0]
}