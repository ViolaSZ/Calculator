function changeTheme(){
    document.querySelector('.equals').classList.toggle('light'); 
    document.querySelector('.number').classList.toggle('light');
    document.querySelector('.button').classList.toggle('light');
    document.querySelector('.calcBody').classList.toggle('light');
    document.querySelector('.output').classList.toggle('light');
}

export {changeTheme};