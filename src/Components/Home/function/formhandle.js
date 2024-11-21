import {useState,useEffect} from 'react';

  export default () => {

    const [form ,setForm] = useState({});
    const [current,setCurrent] = useState("");

    const handleChange = (e,{name, value}) => {
          setForm({...form, [name]: value});
      }

      const [formError, setFormError] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [open , setOpen] = useState(false);
      const [errMessage,setErrMessage] = useState(false);
      const [message,setMessage] = useState("");
      const [forgot,setForgot] = useState(false);
      const [modOpen,setModopen] = useState(false);
      
      const saveAndContinue = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(current)
        setFormError(validate(form,current));
      }

      
  async function fetchData(url,dt,type,method){
    const response = await fetch(url,{
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...dt
      })
    });
    // const data = await response.json();
    // console.log(data);
    // if(data.msg.includes("Sucess")){
      if(response.status === 200){
      setModopen(true);

      // if(type==="Login"){
      //   localStorage.setItem("token",data.token);
      // }
      
      setErrMessage(false);
      setMessage("");
    }else{
      setOpen(false);
      setErrMessage(true);
      setMessage("Username already in use");
    }
  }
     
        useEffect(() => {
            if (Object.keys(formError).length === 0 && isSubmitting) {
            setOpen(true);
            }
            else {
            setIsSubmitting(false);
            }
    
            }, [formError,isSubmitting]);

      const countryOptions = [
        { key: 'a', value: 'Colombo', text: 'Colombo' },
        { key: 'b', value: 'Kandy', text: 'Kandy' },
        { key: 'c', value: 'Gampaha', text: 'Gampaha' },
        { key: 'd', value: 'Matale', text: 'Matale' },
        { key: 'e', value: 'Kalutara', text: 'Kalutara' },
        { key: 'f', value: 'Nuwara Eliya', text: 'Nuware Eliya' },
        { key: 'g', value: 'Kurunegala', text: 'Kurunegala' },
        { key: 'h', value: 'Monaragala', text: 'Monaragalai' },
        { key: 'i', value: 'Badulla', text: 'Badulla' },
        { key: 'j', value: 'Puttalama', text: 'Puttalama' },
        { key: 'k', value: 'Polonnaruwa', text: 'Polonnaruwa' },
        { key: 'l', value: 'Anuradhapura', text: 'Anuradhapura' },
        { key: 'm', value: 'Ampara', text: 'Ampara' },
        { key: 'n', value: 'Batticaloa', text: 'Batticaloa' },
        { key: 'o', value: 'Vavuniya', text: 'Vavuniya' },
        { key: 'p', value: 'Kilinochchi', text: 'Kilinochchi' },
        { key: 'q', value: 'Mullativu', text: 'Mullativu' },
        { key: 'r', value: 'Mannar', text: 'Mannar' },
        { key: 's', value: 'Jaffna', text: 'jaffna' },
        { key: 't', value: 'Galle', text: 'Galle' },
        { key: 'u', value: 'Matara', text: 'Matara' },
        { key: 'v', value: 'Hambantota', text: 'Hambantota' },
        { key: 'w', value: 'Ratnapura', text: 'Ratnapura' },
        { key: 'x', value: 'Kegalle', text: 'Kegalle' },
        { key: 'y', value: 'Trincomalee', text: 'Trincomalee' }
      ]

      const typeOptions = [
        {key: 'a', value: 'organization', text: 'Organization' },
        {key: 'b', value: 'individual', text: 'Individual' },

      ]
      const setreset = () =>{
        setForm({});
        setFormError({});
        setOpen(false);
        setIsSubmitting(false);
      }


      return {form, handleChange,saveAndContinue,formError,errMessage,message,forgot,setForgot,
        countryOptions, typeOptions, open,setOpen,setForm,setIsSubmitting,setreset,setCurrent,setModopen,modOpen,fetchData};

  }
  
  const  validate = (val,type) =>{
    const errors = {};
   
    if(type === 'donor' || type === "beneficiary")
    {
      if (!val.name || val.name.length < 3)
      {
        if(!val.name)
        errors.nameError = 'Name Required';
        else
        errors.nameError = 'Name must be at least 3 characters';
      }
    }
    
    if(type === 'donor' || type === 'beneficiary')
    {


      if (!val.district ) {
        if(!val.district)
        errors.stateError = ' District Required';
        else
        errors.stateError = ' District not found';
      }

      if (!val.type ) {
        if(!val.type)
          errors.typeError = ' Type Required';
        else
          errors.typeError = ' Type not found';
      }

      if(!val.phoneNo || val.phoneNo.length < 10){
        if(!val.phoneNo)
        errors.phoneNoError = ' Phone No. Required';
        else
        errors.phoneNoError = ' Phone No. must be at least 10 characters';
      }

      if(!val.date_of_birth)
      {
        errors.dateError = ' Date Required';
      }

    }

    if(type === 'donor' || type === 'beneficiary' || type === "forgot")
    {
      if (!val?.confirmPassword || val?.confirmPassword !== val.password || val.confirmPassword.length < 8) {
        if(!val?.confirmPassword)
        errors.confirmPasswordError = ' Confirm Password Required';
        else if(val?.confirmPassword !== val?.password)
        errors.confirmPasswordError = ' Password does not match';
        else
        errors.confirmPasswordError = ' Password must be at least 8 characters';
      }
      if (!val.password || val.password.length < 8) {
        if(!val?.password)
        errors.passwordError = ' Password Required';
        else
        errors.passwordError = ' Password must be at least 8 characters';
      }

    }
        
    if (!val.username || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val?.username)) {
      if(!val.username)
      errors.emailError = ' Email Required';
      else
      errors.emailError = 'Invalid Email';
    }

    // if(type === 'login')
    // {
    //   if (!val.password || val.password.length < 8) {
    //     if(!val?.password)
    //     errors.passwordError = ' Password Required';
    //     else
    //     errors.passwordError = ' Password must be at least 8 characters';
    //   }
    //
    // }

    if(type === 'forgot'){
      if(!val.OTP)
      {
        errors.OTPError = ' OTP Required';
      }
    }

    
    return errors;
}
  


  export  {validate}