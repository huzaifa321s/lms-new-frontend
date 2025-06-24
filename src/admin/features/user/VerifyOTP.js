import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import axios from 'axios'

function VerifyOTP() {

  const INITIAL_OTP_OBJ = {
    email: JSON.parse(localStorage.getItem("teacherEmail")),
    otp: ""
  }

  const [obj, setObj] = useState(INITIAL_OTP_OBJ)

  const navigate = useNavigate();
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  
  const postData = async (obj) => {
    try {
        let response = await axios.put("/teacher/verifyUser", obj);
        response = response.data;
        if(response.success) {
            localStorage.removeItem("teacherEmail");
            navigate('/teacher/login');
        };
        console.log("Registration response -> ", response);
    } catch (error) {
        console.log("Registration Error -> ", error);
        console.log("Registration data -> ", error.response.data);
    }
}

  const submitForm = (e) => {
    e.preventDefault();

    if (obj.otp.trim() === "") {
      return setErrorMessage("Please insert OTP!")
    }
    if (obj.otp.length !== 4) {
      return setErrorMessage("Please complete insert OTP!")
    }

    postData(obj);

    // else {
    //     setLoading(true)
    //     // Call API to send password reset link
    //     setLoading(false)
    //     setOtpVerified(true)
    // }
  }


  useEffect(() => {
    const form = formRef.current;
    const inputs = [...form.querySelectorAll('input[type=text]')];
    const submit = form.querySelector('button[type=submit]');

    const handleKeyDown = (e) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === 'Backspace') {
        const index = inputs.indexOf(e.target);
        if (index > 0 && !e.target.value) {
          inputs[index - 1].value = '';
          inputs[index - 1].focus();
        }
      }
    };


    const handleInput = (e) => {
      setErrorMessage("")
      const { target } = e;
      const index = inputs.indexOf(target);
      const newOtpValue = obj.otp + target.value;
      setObj({ ...obj, otp: newOtpValue });

      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          submit.focus();
        }
      }
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text');
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.slice(0, inputs.length);
      // const newOtpValue = otpValue + digits;
      // setOtpValue(newOtpValue);

      const newOtpValue = obj.otp + digits;
      setObj({ ...obj, otp: newOtpValue });


      inputs.forEach((input, index) => (input.value = digits[index]));
      submit.focus();
    };

    inputs.forEach((input) => {
      input.addEventListener('input', handleInput);
      input.addEventListener('keydown', handleKeyDown);
      input.addEventListener('focus', handleFocus);
      input.addEventListener('paste', handlePaste);
    });

    // Clean up event listeners on component unmount
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('input', handleInput);
        input.removeEventListener('keydown', handleKeyDown);
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('paste', handlePaste);
      });
    };
  }, [obj]);

  // Log the OTP value to the console
  useEffect(() => {
    console.log('OTP Value:', obj);
  }, [obj]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto  w-1/4 max-w-2xl  shadow-xl">
        <div className=" bg-base-100 rounded-xl">

          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Verify OTP</h2>

            {
              otpVerified &&
              <>
                <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success' /></div>
                <p className='my-4 text-xl font-bold text-center'>Link Sent</p>
                <p className='mt-4 mb-8 font-semibold text-center'>Check your email to reset password</p>
                <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block gradiant-btn ">Login</button></Link></div>

              </>
            }

            {
              !otpVerified &&
              <>
                <p className='my-8 font-semibold text-center'>Verify your account before login</p>

                  <div className="mb-4">
                    <form ref={formRef} onSubmit={submitForm} id="otp-form">
                      <div className="flex items-center justify-center gap-3">
                        <input
                          type="text"
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          pattern="\d*"
                          maxLength="1"
                        />
                        <input
                          type="text"
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          maxLength="1"
                        />
                        <input
                          type="text"
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          maxLength="1"
                        />
                        <input
                          type="text"
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          maxLength="1"
                        />
                      </div>
                      <div className="max-w-[260px] mx-auto mt-4">
                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                      </div>

                      <button type="submit" className={"btn mt-2 w-full gradiant-btn" + (loading ? " loading" : "")}>Verify</button>
                    </form>
                  </div>

                  <div className='text-center mt-4'>Verified? <Link to="/teacher/login"><button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</button></Link></div>
              </>
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default VerifyOTP