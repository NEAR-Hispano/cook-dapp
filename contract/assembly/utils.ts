import { u128 } from "near-sdk-as";
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
export const RecipeCategorys: Set<String> = new Set();
RecipeCategorys.add("dinner");
RecipeCategorys.add("breakfast");
RecipeCategorys.add("lunch");
RecipeCategorys.add("dessert");
RecipeCategorys.add("snacks");

/* Generates a unique ID */
export function getID(): string {
  return `${context.blockTimestamp}-${context.blockIndex}`;
}

/*  Get current date */
export function getCurrentDate(): string {
  return datetime.block_datetime().toString().split("T")[0];
}

/* Get real rating */
export function mapRating(number: f64): f64 {
  if (number === 0 || isNaN(number)) {
    return 0;
  }
  return <f64>(number / 2);
}

/**
 * Gas is u64
 */

export type Gas = u64;

/**
 * Amounts, Balances, and Money in NEAR is are u128.
 */

export type Amount = u128;

export type Balance = Amount;

export type Money = Amount;

/**
 * == CONSTANTS ================================================================
 *
 * ONE_NEAR = unit of NEAR token in yocto Ⓝ (1e24)
 * XCC_GAS = gas for cross-contract calls, ~5 Tgas (teragas = 1e12) per "hop"
 * MIN_ACCOUNT_BALANCE = 3 NEAR min to keep account alive via storage staking
 *
 * TODO: revist MIN_ACCOUNT_BALANCE after some real data is included b/c this
 *  could end up being much higher
 */

export const ONE_NEAR = u128.from("1000000000000000000000000");
export const XCC_GAS: Gas = 20_000_000_000_000;
export const MIN_ACCOUNT_BALANCE: u128 = u128.mul(ONE_NEAR, u128.from(3));

/**
 * == FUNCTIONS ================================================================
 */

/**
 * @function asNEAR
 * @param amount {u128} - Yocto Ⓝ token quantity as an unsigned 128-bit integer
 * @returns {string}    - Amount in NEAR, as a string
 *
 * @example
 *
 *    asNEAR(7000000000000000000000000)
 *    // => '7'
 */
export function asNEAR(amount: u128): string {
  return u128.div(amount, ONE_NEAR).toString();
}

/**
 * @function toYocto
 * @param amount {number} - Integer to convert
 * @returns {u128}        - Amount in yocto Ⓝ as an unsigned 128-bit integer
 *
 * @example
 *
 *    toYocto(7)
 *    // => 7000000000000000000000000
 */
export function toYocto(amount: number): u128 {
  return u128.mul(ONE_NEAR, u128.from(amount));
}
