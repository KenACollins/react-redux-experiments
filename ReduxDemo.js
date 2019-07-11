// Clear console with each rerun.
console.clear();

// This is a demo of Redux using an insurance company analogy.

//================
// Action Creators
//================
// Synonymous with people dropping off different forms
// Each one returns a plain JavaScript object which we call an action AKA a form.
const createPolicy = (name, amount) => {
   return { // Action, i.e., form
      type: 'CREATE_POLICY',
      payload: {
         name: name,
         amount: amount
      }
   };
};

const deletePolicy = name => {
   return { // Action, i.e., form
      type: 'DELETE_POLICY',
      payload: {
         name: name
      }
   };
};

const createClaim = (name, amount) => {
   return {
      type: 'CREATE_CLAIM',
      payload: {
         name: name,
         amount: amount
      }
   };
};

//=========
// Reducers
//=========
// Synonymous with departments
// Each one implements some logic and then returns data to the central repository.
const claimsHistory = (oldListOfClaims = [], action) => {
   if (action.type === 'CREATE_CLAIM'){
      // We care about this action (i.e., form). Pass back revised list of claims with new one added.
      return [...oldListOfClaims, action.payload];
   }
   
   // We don't care about the action (i.e., form). Return claims list unchanged.
   return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
   if (action.type === 'CREATE_CLAIM') {
      // Return bag of money with amount reduced by claim paid.
      return bagOfMoney - action.payload.amount;
   }
   else if (action.type === 'CREATE_POLICY') {
      // Return bag of money with amount increased by premium paid.
      return bagOfMoney + action.payload.amount;
   }
   return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
   if (action.type === 'CREATE_POLICY') {
      // Pass back revised list of policies with new one added.
      return [...listOfPolicies, action.payload.name];
   }
   else if (action.type === 'DELETE_POLICY') {
      // Return list of policies minus the one we are deleting.
      return listOfPolicies.filter(name => name !== action.payload.name);
   }
   
   return listOfPolicies;
};

//============
// Redux Store
//============
// Create Redux Store with our reducers.
const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
   accounting: accounting,
   claimsHistory: claimsHistory,
   policies: policies
});

const store = createStore(ourDepartments);

//===============================================
// Create actions that alter state in Redux Store
//===============================================
// Create a few actions for new policies and feed each one to the Redux store.
store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

// Create some claim actions and feed them to the Redux store.
store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

// Create a policy deletion action and feed it to the Redux store.
store.dispatch(deletePolicy('Bob'));

// Check current state at any time after a dispatch() invocation.
console.log(store.getState());