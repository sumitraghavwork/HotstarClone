document.querySelector('form').addEventListener('submit', addUser)
  let userData = JSON.parse(localStorage.getItem('userData')) || []

  function addUser() {
    event.preventDefault()
    let form = document.querySelector('form')
    var name = form.fullname.value
    if(name==''){
        alert('Enter Valid Name')
        return
    }
    var phone = form.phone_number.value
    if(phone=='' || phone.length != 10){
        alert('Enter Valid Phone Number of 10 digits')
        return
    }
    var email = form.email.value
    if(!verifyEmail(email)){
        alert('Enter Valid Email Address')
        return
    }
    var password = form.password.value
    if(!verifyPassword(password)){
        alert('Enter at least Eight(8) characters including one Special Character(@,#,_,&) and one Number')
        return
    }
    var user = new UserDetails(name,phone,email,password)
    if (!mapUser(user)) {
      return
    } else {
      userData.push(user)
      localStorage.setItem('userData', JSON.stringify(userData))
      alert('Sign Up Successfull, Proceed to Login')
      window.location.href = 'login.html'
    }
  }
  function UserDetails(name,phone,email,password){
    this.name = name
    this.phone = phone
    this.email = email
    this.password = password
  }
  function mapUser(obj) {
    var userData = JSON.parse(localStorage.getItem('userData')) || []
    for (let i = 0; i < userData.length; i++) {
      if (obj.email == userData[i].email) {
        alert('User Already Exists')
        return false
      }
    }
    return true
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
  function verifyPassword(str){
    if(str.length<8){
        return false
    }
    // let up = false
    let num = false
    let sp = false
    for(let i=0;i<str.length;i++){
        if(str[i]=='@' || str[i]=='_' || str[i]=='$' || str[i]=='&' || str[i]=='#'){
            sp=true
        }
        if(str[i]<9 && str[i]>=0){
            num=true
        }
    }
    // console.log('sp,num',sp,num)
    if(sp && num){
        return true
    }else{
        return false
    }

  }