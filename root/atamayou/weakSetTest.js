//Run this code inside the chrome console, NodeJS does not log weakSet correctly in the console
function weakSetTest(){
    let policeCar={color1: 'white', color2:'black'};
    let ambulance = {color1:'white', color2:'red'};

    let testWeakSet = new WeakSet();
    let testStrongSet = new Set();

    testWeakSet.add(policeCar);
    testStrongSet.add(ambulance);   

    console.log(testWeakSet);
    console.log(testStrongSet);

    policeCar = null;
    ambulance = null;

    //We can't control when the garbage collection happens so we are using an interval to check for it and stopping it after 10 times
    function checkGarbageCollected(){
        console.log(testWeakSet);
        console.log(testStrongSet);
        intervalsTaken++;
    }
    let gcCheckInterval = setInterval(checkGarbageCollected,40000);
    let intervalsTaken = 0;
    if(intervalsTaken === 10){
        clearInterval(gcCheckInterval);
    }
}
weakSetTest();
//Note: There is no warranty garbage collection will run in 10 intervals or less, if you are having issues set the right side of the if to a higher number