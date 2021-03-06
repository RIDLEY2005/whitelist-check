"reach 0.1";
//Common abilities
const Player = {
  verification: Fun([Bool], Null),
};

export const main = Reach.App(() => {
//Alice interface
  const Alice = Participant('Alice', {
    ...Player,
    bobAdd: Fun([], Address)
  });
//Bob interface
  const Bob   = Participant('Bob', {
    ...Player,
    allSet: Fun([], Bool),
  });
  init();
//Alice getting Bobs address
  Alice.only(() => {
    
    const addBob = declassify(interact.bobAdd())
  });
  Alice.publish(addBob)
  commit();
  Bob.only(() => {
    const set = declassify(interact.allSet())
  });
  Bob.publish(set)
  const whiteList = new Set();
  whiteList.insert(Bob);
  commit();
  
//white-list check
if(whiteList.member(addBob)){
  each([Alice, Bob], () => interact.verification(true));
}else{
  each([Alice, Bob], () => interact.verification(false));
}
exit();
});
