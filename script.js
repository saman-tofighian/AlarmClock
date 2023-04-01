const selectAll = document.querySelectorAll('select')

const _time = document.getElementById('time')

const _btnAlarm = document.querySelector('.container > button')

const content = document.querySelector('.content')

let alarmTime , alarmState='noset' ;

let ringTone = new Audio('./ringtone.mp3')

for(i = 23; i>=0 ; i--){
    i = i < 10 ? '0' + i : i
    let _option = `<option value="${i}">${i}</option>`
    selectAll[0].firstElementChild.insertAdjacentHTML('afterend' , _option)
}

for(i = 59; i>=0 ; i--){
    i = i < 10 ? '0' + i : i
    let _option = `<option value="${i}">${i}</option>`
    selectAll[1].firstElementChild.insertAdjacentHTML('afterend' , _option)
}

setInterval(()=>{
    let _date = new Date()
    let _h = _date.getHours()
    let _m = _date.getMinutes()
    let _s = _date.getSeconds()
    _h = _h < 10 ? '0' + _h : _h
    _m = _m < 10 ? '0' + _m : _m
    _s = _s < 10 ? '0' + _s : _s

    _time.innerHTML = `${_h} : ${_m} : ${_s}`

    if(alarmTime == `${_h}:${_m}`){
        ringTone.play()
        ringTone.loop = true
    }else{
        ringTone.pause()
    }

}, 1000)

_btnAlarm.addEventListener('click' , ()=>{
    alarmTime = `${selectAll[0].value}:${selectAll[1].value}`
    if(
        alarmTime.includes('Hour') || alarmTime.includes('Minute')
    ){
        return alert('Specify the time correctly !')
    }
    CheckState(alarmState)
})

function CheckState(state){
    if(state == 'noset'){
        content.classList.add('disable')

        
        _btnAlarm.textContent = 'Clear Alarm'

        alarmState = 'set'

        _btnAlarm.style.background = 'crimson'   
    }
    else{
        content.classList.remove('disable')

        alarmTime = ''

        _btnAlarm.textContent = 'Set Alarm'

        ringTone.pause()

        alarmState = 'noset'

        _btnAlarm.style.background = '#201a31'
    }
}