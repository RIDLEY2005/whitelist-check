import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const Player = {
  verification : (allSet) => {
    if(allSet)
      console.log(stdlib.formatAddress(accBob), ' Found in the whitelist');
    else
      console.log(stdlib.formatAddress(accBob), ' was not found in the whitelist')
  },
  
};

const startingBalance = stdlib.parseCurrency(100);

const [ accAlice, accBob] =
  await stdlib.newTestAccounts(2, startingBalance);
  const fmt = (x) => stdlib.formatCurrency(x, 4);
  
console.log('Alice Deploying Contract...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

console.log('Bob Attached Successfully');

await Promise.all([
  backend.Alice(ctcAlice, {
    ...Player,
    bobAdd : () => {
      console.log('Getting Bob\'s Address which is', stdlib.formatAddress(accBob));
      return accBob.getAddress();
    }
  }),
  backend.Bob(ctcBob, {
    ...Player,
    allSet : () => {
      return true;
    }
  }),
]);

console.log('Whitelist Check Completed!');





