//Run this code inside the chrome console, NodeJS does not log weakMap correctly in the console
function weakMapTest(){
    let policeCar={color1: 'white', color2:'black'};
    let ambulance = {color1:'white', color2:'red'};

    let testWeakMap = new WeakMap();
    let testStrongMap = new Map();

    testWeakMap.set(policeCar, 'Protect and serve');
    testStrongMap.set(ambulance, 'Save lives');   

    console.log(testWeakMap);
    console.log(testStrongMap);

    policeCar = null;
    ambulance = null;
    //We can't control when the garbage collection happens so we are using an interval to check for it and stopping it after 10 times
    function checkGarbageCollected(){
        console.log(testWeakMap);
        console.log(testStrongMap);
        intervalsTaken++;
    }
    let gcCheckInterval = setInterval(checkGarbageCollected,40000);
    let intervalsTaken = 0;
    if(intervalsTaken === 10){
        clearInterval(gcCheckInterval);
    }
}
weakMapTest();
//Note: There is no warranty garbage collection will run in 10 intervals or less, if you are having issues set the right side of the if to a higher number