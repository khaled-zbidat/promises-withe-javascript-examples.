const f =(x : number):Promise<number>=>{

    return  new Promise<number>((resolve,reject)=>{

        if(x != 0){
            resolve(1/x);
        }else{
            reject(new Error("zero division is not allowed"));
        }
    })
  
}
// console.log("first test: -")

// f(100).then( (res) =>console.log(res) ).catch();

    // f(0).then( (res) => console.log(res)).catch((v) => console.log("eroooooor"))


const g = (x: number):Promise<number> =>{

  return new Promise<number>((resolve,reject) => {

    resolve(x*x);
  })
}

// console.log("second test: -")

// g(5).then( (res) =>console.log(res) ).catch();

// g(0).then( (res) =>console.log(res) ).catch();

  function h(x:number): Promise<number> {

    if(x === 0){
      return f(x);
    }
    else{
      return g(x)
        .then(v => {
          return f(v)
        }).then(v => v)
    }
}

// h(10).then( (res) =>console.log(res) ).catch();


//------------------------------- Part 4 - 2 -----------------------------

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 5000, 'one');
//   });

//   const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 6000, 'two');

//   });

  async function slower(arr: Promise<any> []): Promise<[number ,any] | undefined | any[]>  {


    let firstisresolved = false;
    let secondisresolved = false;

    try{

        await arr[0].then(function(){
        firstisresolved = true;
      });
    
      await arr[1].then(function(){
        secondisresolved = true;
      });
    }catch{
      console.log("something went bad");
    }
  
    
  
    if(!(secondisresolved && firstisresolved )){
        console.log("there is one promise got rejected");
        return;
    }else{
  
    
    let num =1;
   try{

      let a = await Promise.race(arr);
      let b = await Promise.all(arr);
      if(a === b[0]){
        num = 0;

      }
      // console.log(num);
      // console.log(a);
      let c = [num,a]
       return c;

   }catch(err){
     console.log("there is a problem")
   }

    }
 }



// console.log(slower([promise1,promise2]))
