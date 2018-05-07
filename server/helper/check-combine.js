function checkCombine(password) {
    let alphabeth = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let num = '0123456789'
    let checker = password.split('')
    let counterAlpha = 0
    let counterNum = 0

    checker.forEach(check =>{
        if( alphabeth.indexOf(check)!= -1){
            counterAlpha ++
        }else{
            if( num.indexOf(check)!= -1){
            counterNum ++
            }
        }
    })

    return(counterAlpha != 0 && counterNum != 0)
}

module.exports = checkCombine

