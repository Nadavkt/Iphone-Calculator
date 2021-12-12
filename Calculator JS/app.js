// DOM elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const precentEl = document.querySelector('.precent');

const divisionEl = document.querySelector('.division');
const multiplyEl = document.querySelector('.multiply');
const subtractEl = document.querySelector('.subtract');
const addEl = document.querySelector('.add');

const decimalEl = document.querySelector('.decimal');
const equalEl = document.querySelector('.equal');

const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');

const numberElArray = [
    number0El, number1El, number2El, number3El, number4El,
    number5El, number6El, number7El, number8El, number9El
];

// variables

let valueStrInMemory = null;
let opreatorInMemory = null;



//Functions

const getValueAsStr = () =>  valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
}

const setStrAsValue = (valueStr) => {
    if(valueStr[valueStr.length - 1] === '.'){
        valueEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr){
        valueEl.textContent = 
            parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    }else{
        valueEl.textContent = parseFloat(wholeNumStr).toLocaleString()
    }
    
}



const handleNumberClick = (numStr) => {
    const currentDispalyStr = getValueAsStr();
    if(currentDispalyStr === '0'){
        setStrAsValue(numStr);
    }
    else{
        setStrAsValue(currentDispalyStr + numStr)
        
    }
    
}

const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if(opreatorInMemory === 'add'){
        newValueNum = valueNumInMemory + currentValueNum;

    }else if (opreatorInMemory === 'subtract'){
        newValueNum = valueNumInMemory - currentValueNum;
    }else if (opreatorInMemory === 'multiply'){
        newValueNum = valueNumInMemory * currentValueNum;
    }else if (opreatorInMemory === 'division'){
        newValueNum = valueNumInMemory / currentValueNum;
    }

    return newValueNum.toString();

}


const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();
    if(!valueStrInMemory){
        valueStrInMemory = currentValueStr;
        opreatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    const valueNumInMemory = parseFloat(valueStrInMemory);
    valueStrInMemory = getResultOfOperationAsStr();
    opreatorInMemory = operation;
    setStrAsValue('0');
};



// Add Event Listeners to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');

})
pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if(currentValueStr === '-0'){
        setStrAsValue('0');
        return;
    }

    if(currentValueNum >= 0){
        setStrAsValue('-' + currentValueStr);
    }
    else{
        setStrAsValue(currentValueStr.substring(1));
    }
});
precentEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    opreatorInMemory = null;
})


// add event listeners to operators

addEl.addEventListener('click', () => {
    handleOperatorClick('add');
})
subtractEl.addEventListener('click', () => {
    handleOperatorClick('subtract');
})
multiplyEl.addEventListener('click', () => {
    handleOperatorClick('multiply');
})
divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
})
equalEl.addEventListener('click', () =>{
    if(valueStrInMemory){
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        opreatorInMemory = null;
    }
})







// Add Events Listeners to numbers and decimal
for (let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    })
}

decimalEl.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if(!currentValueStr.includes('.')){
        setStrAsValue(currentValueStr + '.')
    }
})





// set up the time 
const updateTime = () => {

    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();
