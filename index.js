//倒數計時器變數
let timer
const timeDisplay = document.querySelector('#countdown-clock')
const timerButton = document.querySelectorAll('.timer-button')
const startButton = document.querySelector('#start-btn')
const resetButton = document.querySelector('#reset-btn')
const pauseButton = document.querySelector('#pause-btn')
const customizeInput = document.querySelector('#customize-btn')

//代辦清單變數
const toDoList = document.querySelector('#to-do-list')
const newTodoInput = document.querySelector('#new-todo')
const addBtn = document.querySelector('#add-btn')

// 計算機變數
const calculatorDisplay = document.querySelector('#calculator-display')
const calculatorBtn = document.querySelector('#calculator-btn')
const calculatorClearDisplay = document.querySelector('#calculator-clear-display')
const calculateBtn = document.querySelector('#calculate')

const model = {
  setSecond: [1500],
  toDoList: [],
  num1: '',
  num2: '',
  operatorSymbol: '',
  calculateResult: '',
  bool: false,
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
  addToDisplay(number) {
<<<<<<< HEAD
    calculatorDisplay.value = number
=======
    calculatorDisplay.value += `${number}`
>>>>>>> f8b182871aec13ef6483b40ac0129f204563a5db
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
  //計算機運算
  calculate() {
<<<<<<< HEAD
    switch(model.operatorSymbol) {
      case '+':
        model.calculateResult = model.num1 + model.num2
        break
      case '-':
        model.calculateResult = model.num1 - model.num2
        break
      case '*':
        model.calculateResult = model.num1 * model.num2
        break
      case '/':
        model.calculateResult = model.num1 / model.num2
        break
    } 
    
=======
    let result = eval(model.storeCalculatorStr.join(''))
    view.addToDisplay(result)
>>>>>>> f8b182871aec13ef6483b40ac0129f204563a5db
  },
  //清除計算機畫面
  calculatorClear() {
    calculatorDisplay.value = ''
    view.addToDisplay('')
  }
}

view.displayTimeLeft(1500)

//監聽器

//計時器 快速設定時間監聽器
timerButton.forEach(button => button.addEventListener('click', function onClicked(event) {
  const sec = Number(event.target.dataset.time) * 60
  view.displayTimeLeft(sec)
  if (model.setSecond.length !== 0) {
    model.setSecond = []
  } model.setSecond.push(sec)
  console.log(model.setSecond[0])
}))
//計時器 開始按鈕監聽器
startButton.addEventListener('click', function onClicked(event) {
  controller.timer(parseInt(model.setSecond[0]))
  startButton.disabled = true
  customizeInput.disabled = true
  customizeInput.value = ''
  timerButton.forEach((btn) => btn.disabled = true)
})
//計時器 暫停按鈕監聽器
pauseButton.addEventListener('click', () => {
  controller.pauseTimer()
  startButton.disabled = false
})
<<<<<<< HEAD

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

=======
// 計時器 重置按鈕監聽器
>>>>>>> f8b182871aec13ef6483b40ac0129f204563a5db
resetButton.addEventListener('click', () => {
  controller.pauseTimer()
  startButton.disabled = false
  customizeInput.disabled = false
  view.displayTimeLeft(model.setSecond[0])
  timerButton.forEach((btn) => btn.disabled = false)
})
<<<<<<< HEAD

//計算機按鈕監聽器
calculatorBtn.addEventListener('click', function onClicked(event){
    let bool = false // 控制給第幾個數字賦值
    
    value = event.target.value
    if(!model.bool){
      if(event.target.classList.contains('calculator-num')){
        model.num1 += value
        model.num1 = parseInt(model.num1)
        view.addToDisplay(model.num1)
      } else { 
        if ((event.target.classList.contains('calculator-operator'))){
          model.bool = true
          model.operatorSymbol = value
          console.log(model.num1)
        }
      }
    } else {
      if(event.target.classList.contains('calculator-num')){
        model.num2 += value
        model.num2 = parseInt(model.num2)
        view.addToDisplay(model.num2)
      }
    }
    //計算機結果
    if (event.target.classList.contains('calculate')){
      controller.calculate()
      result = model.calculateResult.toString()
      view.addToDisplay(result)
      //將結果值改成下次運算的 num1
      model.num1 = model.calculateResult
      model.num2 = ''
      model.bool = false
    }
    //清空計算機
    if (event.target.classList.contains('calculator-reset')){
      model.bool = false
      model.num1 = ''
      model.num2 = ''
      model.calculateResult = ''
      view.addToDisplay('')
    }
  })


=======
//計時器 自訂時間輸入監聽器
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

// 待辦清單 新增按鈕監聽器
addBtn.addEventListener('click', function () {
  let inputValue = newTodoInput.value
  if (inputValue.length > 0) {
    controller.addItem(inputValue)
  }
  controller.clearInput()
})
// 待辦清單 刪除按鈕監聽器
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

//計算機按鈕監聽器
calculatorNumBtn.forEach((button) => {
  button.addEventListener('click', function onClicked(event) {
    let value = event.target.value
    if (event.target.classList.contains('calculator-num')) {
      view.addToDisplay(value)
      model.storeCalculatorStr.push(value)
    } else if (event.target.classList.contains('calculator-operator')) {
      model.storeCalculatorStr.push(value)
      controller.calculatorClear()
    }
  })
})
//計算機結果按鈕監聽器
calculateBtn.addEventListener('click', () => {
  controller.calculatorClear()
  controller.calculate()
})
//計算機清除按鈕監聽器
calculatorClearDisplay.addEventListener('click', () => {
  controller.calculatorClear()
  model.storeCalculatorStr = []
})
>>>>>>> f8b182871aec13ef6483b40ac0129f204563a5db
