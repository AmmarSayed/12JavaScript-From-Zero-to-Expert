//////////////////////////////
// 281. Let's Fix Some Bad Code: Part 1
//////////////////////////

//////////////////////////////
//283. Let's Fix Some Bad Code: Part 2
//////////////////////////////

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => {
  return limits?.[user] ?? 0;
};

const addExpense = function (state, limits, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  // if (value <= getLimit(cleanUser)) {
  //   return [...state, { value: -value, description, cleanUser }];
  // }
  return value <= getLimit(limits, cleanUser) ? [...state, { value: -value, description, cleanUser }] : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(newBudget1);
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Movies 🍿', 'Matilda');
console.log(newBudget2);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

const checkExpenses = (state, limits) =>
  state.map(entry => (entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limit' } : entry));

const finalBudget = checkExpenses(newBudget3);

console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => `${entry.description.slice(-2)}`)
    .join(' / ');
  // .reduce((str, current) => `${str} / ${current.description.slice(-2)} `, '');

  console.log(bigExpenses);
  // let output = '';
  // for (const entry of budget) output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';

  // output = output.slice(0, -2); // Remove last '/'
};

logBigExpenses(finalBudget, 500);
