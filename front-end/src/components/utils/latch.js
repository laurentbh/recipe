var CountdownLatch = function (limit){
    this.limit = limit;
    this.count = 0;
    this.waitBlock = function (){};
  };
  CountdownLatch.prototype.countDown = function (){
    this.count = this.count + 1;
    if(this.limit <= this.count){
      return this.waitBlock();
    }
  };
  CountdownLatch.prototype.await = function(callback){
    this.waitBlock = callback;
  };
  export default CountdownLatch
  /*
  setTimeout(function (){
  console.log('work A');
  barrier.countDown();
}, 100);
setTimeout(function (){
  console.log('work B');
  barrier.countDown();
}, 200);

console.log('wait for all to finish...');
barrier.await(function(){
  console.log('done all');
});

==>
wait for all to finish...
work A
work B
done all
*/