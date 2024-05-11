let timer
const timeDisplay = document.querySelector('#countdown-clock')
const timerButton = document.querySelectorAll('.timer-button')
const startButton = document.querySelector('#start-btn')
const resetButton = document.querySelector('#reset-btn')
const pauseButton = document.querySelector('#pause-btn')
const customizeInput = document.querySelector('#customize-btn')

const toDoList = document.querySelector('#to-do-list')
const newTodoInput = document.querySelector('#new-todo')
const addBtn = document.querySelector('#add-btn')

const calculatorDisplay = document.querySelector('#calculator-display')
const calculatorBtn = document.querySelector('#calculator-btn')
const calculatorClearDisplay = document.querySelector('#calculator-clear-display')
const calculateBtn = document.querySelector('#calculate')

let isClicked = false //判斷是否是第一次按運算符
let isRepeat = false //判斷運算符是否重複點擊

const CALCULATE_STATE = {
  num1State: 'num1State',
  num2State: 'num2State',
  operateState: 'operateState',
  operateState2: 'operateState2',
  resultState: 'resultState',
  operateStateRepeat: 'operateStateRepeat'
}

const model = {
  setSecond: [1500],
  toDoList: [],
  num1: [],
  num2: [],
  operatorSymbol: '',
  calculateResult: 0,
  displayValue:[]
}


const view = {
  //渲染倒數計時器
  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const reminderSeconds = seconds % 60
    const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
    timeDisplay.innerHTML = display
  },
  //計算機顯示畫面
  addToDisplay( value) {
    calculatorDisplay.value = value
  }
}

const controller = {
  
  //計時器
  timer(seconds) {
    const now = Date.now()
    const then = now + seconds * 1000
    view.displayTimeLeft(seconds)
    countdown = setInterval(() => {
      const secondsleft = Math.round((then - Date.now()) / 1000)
      if (secondsleft >= 0) {
        view.displayTimeLeft(secondsleft)
      } else {
        clearInterval(countdown)
        return
      }
    }, 1000)
  },
  // 停始計時
  pauseTimer() {
    clearInterval(countdown)
  },
  //To Do List
  addItem(text) {
    let newItem = document.createElement('li')
    newItem.innerHTML = `
    <div>  
        <input  type="checkbox" id="check-24" name="check" value="" />
        <label for="check-24" class='item' >
          <span ><!-- This span is needed to create the "checkbox" element --></span>${text}
        </label>
      <i class="fa-solid fa-trash delete"></i>
    </div>
      `
    toDoList.appendChild(newItem)
  },
  //Clear Input 
  clearInput() {
    newTodoInput.value = ''
  },
  //計算機初始狀態
  currentState: CALCULATE_STATE.num1State,
  //計算機初始變化
  calculateState() {
    switch(this.currentState) {
      // 起始數字
      case 'num1State':
        model.num1.push(value)
        model.displayValue.push(value)
        view.addToDisplay(model.displayValue.join(''))
        break
      //第一個運算符 
      case 'operateState':
        model.operatorSymbol = value
        model.displayValue.push(model.operatorSymbol)
        view.addToDisplay(model.displayValue.join(''))
        // this.calculate()
        break
      // 第二個數字
      case 'num2State':
        model.num2.push(value)
        model.displayValue.push(value)
        view.addToDisplay(model.displayValue.join(''))
        break
      case 'operateState2':
      // 第二個運算符
        //開始運算
        this.calculate()
        view.addToDisplay(model.displayValue.join(''))
        // 將運算結果推到第一個數字，並清空第二個數字
        model.num1 = []
        model.num1.push(model.calculateResult)
        model.num2 = []
        //將第二個運算符推進
        model.operatorSymbol = value
        model.displayValue.push(model.operatorSymbol)
        view.addToDisplay(model.displayValue.join(''))
        break
      // 運算符重複
      case 'operateStateRepeat':
        model.operatorSymbol = value
        model.displayValue.push(model.operatorSymbol)
        model.displayValue.splice(-2,1)
        view.addToDisplay(model.displayValue.join(''))
        break
    }
  },
  //計算機運算
  calculate() {
    let num1 = Number(model.num1.join(''))
    let num2 = Number(model.num2.join(''))
    switch(model.operatorSymbol) {
      case '+':
        model.calculateResult = num1 + num2
        break
      case '-':
        model.calculateResult = num1 - num2
        break
      case '*':
        model.calculateResult = num1 * num2
        break
      case '/':
        model.calculateResult = num1 / num2
        break
    } 
    
  },
  //清除計算機畫面
  calculatorClear() {
    view.addToDisplay('')
    model.num1 = []
    model.num2 = []
    model.displayValue = []
    model.calculateResult = 0
    model.operatorSymbol = ''
    isClicked = false
  }
}

view.displayTimeLeft(1500)


timerButton.forEach(button => button.addEventListener('click', function onClicked(event) {
  const sec = Number(event.target.dataset.time) * 60
  view.displayTimeLeft(sec)
  if (model.setSecond.length !== 0) {
    model.setSecond = []
  } model.setSecond.push(sec)
  console.log(model.setSecond[0])
}))

startButton.addEventListener('click', function onClicked(event) {
  controller.timer(parseInt(model.setSecond[0]))
  startButton.disabled = true
  customizeInput.disabled = true
  customizeInput.value = ''
  timerButton.forEach((btn) => btn.disabled = true)
})


pauseButton.addEventListener('click', () => {
  controller.pauseTimer()
  startButton.disabled = false
})

// 新增To Do 按鈕監聽器
addBtn.addEventListener('click', function () {
  let inputValue = newTodoInput.value
  if (inputValue.length > 0) {
    controller.addItem(inputValue)
  }
  controller.clearInput()
})

//刪除按鈕監聽器
toDoList.addEventListener('click', function onclicked(event) {
  let target = event.target
  if (target.classList.contains('delete')) {
    let parentElement = target.parentElement
    parentElement.remove()
  } else if (target.tagName === 'SPAN') {
    target.classList.toggle('checked')
  }
  console.log(target)
})

//自訂時間輸入監聽器
customizeInput.addEventListener('input', function onSubmitted(event) {
  let customizeSec = Number(this.value) * 60
  if (customizeSec > 0) {
    view.displayTimeLeft(customizeSec)
  } else {
    alert('請輸入數字')
    this.value = ''
    return
  }
  if (model.setSecond.length !== 0) {
    model.setSecond = []
  } model.setSecond.push(customizeSec)
})

resetButton.addEventListener('click', () => {
  controller.pauseTimer()
  startButton.disabled = false
  customizeInput.disabled = false
  view.displayTimeLeft(model.setSecond[0])
  timerButton.forEach((btn) => btn.disabled = false)
})


//計算機按鈕監聽器
calculatorBtn.addEventListener('click', function onClicked(event){
   
    let target = event.target
    value = target.value
    if(target.classList.contains('calculator-num') ) {
      isRepeat = false
      if (isClicked === false) {
        controller.currentState = CALCULATE_STATE.num1State
        controller.calculateState()
        
      } else if (isClicked === true) {
        controller.currentState = CALCULATE_STATE.num2State
        controller.calculateState()
      }   
    } else if (target.classList.contains('calculator-operator')) {
        if(isClicked === false && model.num1.length !== 0){
          isClicked = true
          controller.currentState = CALCULATE_STATE.operateState
          controller.calculateState()
        } else if (isClicked === true && isRepeat === false) {
          controller.currentState = CALCULATE_STATE.operateState2
          controller.calculateState()
        } 
        if ( isRepeat === true ) {
          controller.currentState = CALCULATE_STATE.operateStateRepeat
          controller.calculateState()
          isRepeat = false
        }
        isRepeat = true
    }
  
    //計算機結果
    if (event.target.classList.contains('calculate')){
      controller.calculate()
      model.displayValue.push(model.calculateResult)
      view.addToDisplay(model.calculateResult)
      //將前面的運算過程清空，只留下結果
      model.num1 = []
      model.num2 = []
      model.displayValue = []
      model.num1.push(model.calculateResult)
      model.displayValue.push(model.num1)
      isClicked = false
    }
    //清空計算機
    if (event.target.classList.contains('calculator-reset')){
      controller.calculatorClear()
    }
  console.log(controller.currentState)
  console.log(model.num1)
  console.log(model.num2)
  console.log(model.calculateResult)


  })




