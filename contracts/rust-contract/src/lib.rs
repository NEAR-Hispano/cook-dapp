use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};
near_sdk::setup_alloc!();

// add the following attributes to prepare your code for serialization and invocation on the blockchain
// More built-in Rust attributes here: https://doc.rust-lang.org/reference/attributes.html#built-in-attributes-index
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    // See more data types at https://doc.rust-lang.org/book/ch03-02-data-types.html
    val: i8, // i8 is signed. unsigned integers are also available: u8, u16, u32, u64, u128
}

#[near_bindgen]
impl Counter {
    /// Returns 8-bit signed integer of the counter value.
    ///
    /// This must match the type from our struct's 'val' defined above.
    ///
    /// Note, the parameter is `&self` (without being mutable) meaning it doesn't modify state.
    /// In the frontend (/src/main.js) this is added to the "viewMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near view counter.YOU.testnet get_num
    /// ```
    pub fn get_num(&self) -> i8 {
        return self.val;
    }


}

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // part of writing unit tests is setting up a mock context
    // in this example, this is only needed for env::log in the contract
    // this is also a useful list to peek at when wondering what's available in env::*
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
    
    }

}