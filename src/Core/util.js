export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!email || email.length <= 0) return 'Mobile No / Email ID cannot be empty.';
    if (re.test(email)){
      return '';
    } 
   
  else{
    if(phoneno.test(email)){
      return '';
    }
    else{
      return 'Please enter a valid Mobile No / Emai ID';
    }
  }
  };
  export const ForgotemailValidator = email => {
    const re = /\S+@\S+\.\S+/;
    if (!email || email.length <= 0) return 'Email ID cannot be empty';
    if (!re.test(email)) return 'Pleasae enter a valid Emai ID';
      return '';
   
  };
  export const passwordValidator = password => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';
  
    return '';
  };
  
  export const nameValidator = name => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';
  
    return '';
  };