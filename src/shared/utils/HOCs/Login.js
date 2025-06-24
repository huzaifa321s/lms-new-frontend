// // components/Login.js
// import OTP from '../../main/utils/reusable/OTP';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { handleLogin } from '../features/auth/authSlice';

// const Login = ({ urls, redirectPath }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [step, setStep] = useState('login');
//   const [login, setLogin] = useState({ email: '', password: '', otp: '' });
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLogin({ ...login, [name]: value });
//   };

//   const handleOTP = (otp) => {
//     setLogin({ ...login, otp: otp });
//   };

//   const submitLogin = async (e) => {
//     e.preventDefault();
//     try {
//       let response = await fetch(urls.loginApiEndpoint, {
//         method: 'POST',
//         body: JSON.stringify(login),
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//       });

//       response = await response.json();

//       if (response.success && !response.data) {
//         setStep('verify_otp');
//       }

//       if (response.success && response.data) {
//         const token = response.data.token;
//         const cookieName = urls.cookieName || 'userToken';
//         const cookiePath = urls.cookiePath || '/';
//         const maxAge = urls.cookieMaxAge || 30 * 24 * 60 * 60; // Default 30 days

//         if (rememberMe) {
//           document.cookie = `${cookieName}=${token}; path=${cookiePath}; max-age=${maxAge}`;
//         } else {
//           document.cookie = `${cookieName}=${token}; path=${cookiePath}`;
//         }

//         dispatch(handleLogin(token));
//         navigate(redirectPath);
//       }

//       alert(response?.message);

//       console.log('Registration response -> ', response);
//     } catch (error) {
//       console.log('Registration Error --> ', error);
//     }
//   };

//   const submitOTP = async (e) => {
//     e.preventDefault();
//     try {
//       let response = await fetch(urls.verifyTwoFactor, {
//         method: 'POST',
//         body: JSON.stringify(login),
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//       });
//       response = await response.json();

//       if (response.success) {
//         setStep('otp_verified');
//         setLogin({ email: '', password: '', otp: '' });

//         const token = response.data.token;
//         const cookieName = urls.cookieName || 'userToken';
//         const cookiePath = urls.cookiePath || '/';
//         const maxAge = urls.cookieMaxAge || 30 * 24 * 60 * 60; // Default 30 days

//         if (rememberMe) {
//           document.cookie = `${cookieName}=${token}; path=${cookiePath}; max-age=${maxAge}`;
//         } else {
//           document.cookie = `${cookieName}=${token}; path=${cookiePath}`;
//         }

//         dispatch(handleLogin(true));
//         navigate(redirectPath);
//       }

//       alert(response?.message);

//       console.log('Registration response -> ', response);
//     } catch (error) {
//       console.log('Registration Error --> ', error);
//     }
//   };

//   const resendOTP = async () => {
//     try {
//       let response = await fetch(urls.regenerateOTP, {
//         method: 'PUT',
//         body: JSON.stringify({
//           email: login.email,
//           otpLength: 6,
//         }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       });
//       response = await response.json();
//       alert(response?.message);

//       console.log('Registration response -> ', response);
//     } catch (error) {
//       console.log('Registration Error --> ', error);
//     }
//   };

//   return (
//     <>
//       <div style={main_styles} className="d-flex justify-content-center align-items-center">
//         <div className="card p-4">
//           <h2 className="card-title text-center">
//             {step === 'login' && 'Login'}
//             {step === 'verify_otp' && 'Verify OTP'}
//             {/* Add other steps as needed */}
//           </h2>

//           <div className="card-body rounded">
//             {step === 'login' && (
//               <form onSubmit={submitLogin}>
//                 <div className="form-group mb-3">
//                   <label htmlFor="email_id">Email</label>
//                   <input
//                     id="email_id"
//                     type="email"
//                     name="email"
//                     required
//                     value={login.email}
//                     onChange={handleChange}
//                     className="form-control"
//                     placeholder="Enter your Email"
//                   />
//                 </div>
//                 <div className="form-group mb-3">
//                   <label htmlFor="password_id">Password</label>
//                   <input
//                     id="password_id"
//                     type="password"
//                     name="password"
//                     autoComplete="on"
//                     value={login.password}
//                     onChange={handleChange}
//                     required
//                     className="form-control"
//                     placeholder="Enter your Password"
//                   />
//                 </div>
//                 <div className="form-check mb-1">
//                   <input
//                     type="checkbox"
//                     id="flexCheckDefault"
//                     className="form-check-input"
//                     value={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                   />
//                   <label className="form-check-label" htmlFor="flexCheckDefault">
//                     Remember me.
//                   </label>
//                 </div>
//                 <button type="submit" className="btn btn-success w-100">
//                   Login
//                 </button>
//               </form>
//             )}

//             {step === 'verify_otp' && (
//               <form onSubmit={submitOTP}>
//                 <OTP numberOfDigits={6} getOTP={handleOTP} />
//                 <div
//                   onClick={() => resendOTP()}
//                   className="d-flex flex-row-reverse bd-highlight"
//                   style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
//                 >
//                   Resend OTP!
//                 </div>
//                 <button type="submit" className="btn btn-success w-100">
//                   Submit OTP
//                 </button>
//               </form>
//             )}
//             {/* Add other steps as needed */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const main_styles = { height: '90vh' };

// export default Login;
