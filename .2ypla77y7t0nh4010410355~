let version = 'v1.2.0'
let bossFightBadge = false
document.querySelectorAll('.version').forEach(e => e.innerText = version)
let bossFightMode = false
if($.jStorage.get('bossFightMode')) bossFightMode = true
if($.jStorage.get('bossFightBadge')) bossFightBadge = true
if(bossFightBadge) {
    document.querySelector('.boss-fight-badge').innerText = '打敗過柴柴'
    document.querySelector('.boss-fight-badge').style.color = '#f00'
}
setInterval(() => {
    if(!$) return
    if(bossFightBadge) $.jStorage.set('bossFightMode', true)
    if(!bossFightMode) $.jStorage.set('bossFightMode', false)
})

console.log(`
████████████████   
       ██
     ██████
   ██  ██  ██
██     ██     ██
       ██
       
████████████████
    ██    ██    
████████████████
██  ██    ██  ██
████████████████
    ██    ██
████████████████
  ██       ██
██       ██
  ████████
  ██    ██
██        ████

  ██      ██████████
██████        ██
  ██          ██
  ████        ██
████          ██
  ██        ████

        ██
██████████████████
██              ██
   ████████████
             ██
          ██
██████████████████
        ██
        ██
     ████
`)