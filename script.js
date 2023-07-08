const numberButtons= document.querySelectorAll("[data-numbers]")
const operatorButtons= document.querySelectorAll("[data-operator]")
const equalsButton= document.querySelector("[data-equals]")
const allClearButton= document.querySelector("[data-all-clear]")
const deleteButton=document.querySelector("[data-delete]")
const previousOperandTextElement=document.querySelector("[data-previous-operand]")
const currentOperandTextElement=document.querySelector("[data-current-operand]")

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    clear()
    {
        this.currentOperand=""
        this.previousOperand=""
        this.operator =undefined
    }

    delete()
    {
        this.currentOperand=this.currentOperand.toString.slice(0,-1)
    }

    appendNumber(number)
    {
        if(number==="."&& this.currentOperand.includes(".")) return
        this.currentOperand= this.currentOperand.toString() + number.toString()
    }

    chooseOperator(operator)
    {
        if(this.currentOperand==="") return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operator=operator
        this.previousOperand= this.currentOperand
        this.currentOperand=''
    }

    compute()
    {
        let computation
        const prev= parseFloat(this.previousOperand)
        const current= parseFloat(this.currentOperand)
        if(isNaN(prev)|| isNaN(current)) return

        switch(this.operator){
            case "+":
                computation=prev+current
                break

            case "-":
                computation=prev-current
                break

            case "×":
                computation=prev*current
                break

            case "÷":
                computation=prev/current
                break
            
            default:
                return
        }

        this.currentOperand=computation
        this.operator=undefined
        this.previousOperand=""
    }

    getDisplayNumber(number){
        const stringNumber= number.toString()
        const integerDigits= parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }
        const floatNumber= parseFloat(number)
        if(isNaN(floatNumber) ) return ""
        return floatNumber.toLocaleString('en')
    }

    updateDisplay()
    {
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operator!= null){
            this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operator} ${this.currentOperand}`
        }
        else{
            this.previousOperandTextElement.innerText=""
        }
    }
}


const calculator= new Calculator(previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
    button.addEventListener("click", () => { 
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })

})


operatorButtons.forEach(button => {
    button.addEventListener("click", () => { 
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay();
    })
}) 


equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})


