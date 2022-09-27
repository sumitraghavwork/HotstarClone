document.querySelector('form').addEventListener('submit', verifyUser)
  let userData = JSON.parse(localStorage.getItem('userData')) || []
  //verify user entered details
  function verifyUser() {
    event.preventDefault()
    let form = document.querySelector('form')
    var email = form.email.value
    if(!verifyEmail(email)){
        alert('Enter Valid Email')
        return
    }
    var password = form.password.value
    if(password==''){
        alert('Enter Valid Password')
        return
    }
    var user = new UserDetails(email,password)
    mapUser(user)
  }
  function UserDetails(email,password){
    this.email = email
    this.password = password
  }
  //map existing data with entered data
  function mapUser(obj) {
    var userArr = JSON.parse(localStorage.getItem('userData')) || []
    for (let i = 0; i < userArr.length; i++) {
      if (
        obj.email == userArr[i].email &&
        obj.password == userArr[i].password
      ) {
        alert('Login Succesfull')
        window.location.href = 'index.html'
        //return when login is succesfull
        return
      } else if (
        obj.email == userArr[i].email &&
        obj.password != userArr[i].password
      ) {
        alert('Incorrect Password')
        return
      }
    }
    //when user is not found
    alert('Invalid Credentials! Please Sign Up')
    // window.location.href = 'signup.html'
  }
  function verifyEmail(str){
    let flag1=false
    let flag2=false
    for(let i=0;i<str.length;i++){
        if(str[i]=='@'){
            flag1=true
        }
        if(str[i]=='.'){
            flag2=true
        }
    }
    if(flag1 && flag2){
        return true
    }else{
        return false
    }
  }