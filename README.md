# DiUS Code Challenge - Ben Clare

Setup: `npm install`

Run: `npm start`

Test: `npm test`

Test with coverage: `jest --coverage`

Can edit what it runs from `src/main.js`.

## Project Overview
All source files are in the `src` folder.
Uses `jest` for testing, running the `*.test.js` files.

Works by providing a `Checkout` object, which can have discount rules registered on creation.
Each rule is a function, provided with the items that will be passed to checkout. 
Each rule can edit the items list in any way it wants.

Each `product` is defined in the `products.js` file. 
File exports a function to fetch products by id.

### Why this approach?
Given how discounts are applied, I've generified them out to a series of checks, and effects.
I use the callback style rules to do both, as they can decide if they should apply, and then how the 
discount should be applied.

This makes for a highly extensible architecture, as anything that can be coded can be created into a rule.

However, to ensure the rules don't "overlap", would take some additional work.
This also means a code change needs to be applied when a new rule is introduced. Given, it wouldn't be hard to extend 
this to support loading duplicates of the rules (eg: *bulk discounts for different products*) from a database, but a new 
rule with new logic (eg: *buy X and Y and get a free Z*), would require a code change.


#### Ways to extend:
* Meta rules, for common checks/effects. Applied via something like RxJs's `Observable.pipe()` API.
```js
// Would only apply the given rule to items of the specified product code
// NOTE: Mock/Theoretical API, just to demonstrate point.
const appliedForProductCode = productCode => {
    return rule => {
        return items => {
            rule(items.filter(item => item.sku === productCode));
        }
    }
};

const demoRule = items => {
    items.forEach(item => item.price -= 1);
};

// Applied via something like this
RuleChain.pipe(
    appliedForProductCode('vga'),
    demoRule
);
```

* Ordering system, so if eg: rule A only applies if no other discounts are applied. Similar idea to Java servlet filter 
chain.
* Some way to apply/simulate different rule orderings, to maximize savings for customer.

### Known problem(s):

As rules and effects are applied in the same "step", the effects of an earlier rule can "overlap" with a following rule.
This isn't ideal, and would ideally be fixed by separating checks and effects. However, out of scope for this.

Due to how I've applied the rules as well, the rules will edit the items list. Changing prices etc.
This has the side effect of making a "checkout" single use, and should probably either immutably process checkout, or
"close" itself when its been "consumed".

Because I've hard-coded the product list, I was worried the rules would edit the original product objects. 
If they were loaded from eg: a database, each "entry" would be a unique object, so this wouldn't be an issue, 
but because they are all in memory and reused, I've made the `getProductBySku(...)` call return a shallow copy of 
the product. It works, because the object just holds primitives, but this isn't a very good long term solution.

There's also a known rounding issue. That can be solved by using a proper precision maths library, that properly handles
decimals and floats, eg: [MathJs](https://mathjs.org), [FinanceJs](http://financejs.org/), etc.

------------------------------------------------------------------------------------------------------------------------

## Instructions Reference
DiUS is starting a computer store. You have been engaged to build the checkout system. We will start with the following products in our catalogue


| SKU     | Name        | Price    |
| --------|:-----------:| --------:|
| ipd     | Super iPad  | $549.99  |
| mbp     | MacBook Pro | $1399.99 |
| atv     | Apple TV    | $109.50  |
| vga     | VGA adapter | $30.00   |

As we're launching our new computer store, we would like to have a few opening day specials.

- we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
- the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
- we will bundle in a free VGA adapter free of charge with every MacBook Pro sold

As our Sales manager is quite indecisive, we want the pricing rules to be as flexible as possible as they can change in the future with little notice.

Our checkout system can scan items in any order.

The interface to our checkout looks like this (shown in java):

```java
  Checkout co = new Checkout(pricingRules);
  co.scan(item1);
  co.scan(item2);
  co.total();
```

Your task is to implement a checkout system that fulfils the requirements described above.

Example scenarios
-----------------

SKUs Scanned: atv, atv, atv, vga
Total expected: $249.00

SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
Total expected: $2718.95

SKUs Scanned: mbp, vga, ipd
Total expected: $1949.98

Notes on implementation:

- use **Java, Javascript, TypeScript, Ruby, Kotlin, Python, Swift, or Groovy**
- try not to spend more than 2 hours maximum. (We don't want you to lose a weekend over this!)
- don't build guis etc, we're more interested in your approach to solving the given task, not how shiny it looks
- don't worry about making a command line interface to the application
- don't use any frameworks (rails, spring etc), or any external jars/gems (unless it's for testing or build/dependency mgt)

When you've finished, send through the link to your github-repo. Happy coding
