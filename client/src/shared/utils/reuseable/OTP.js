import React, { useCallback, useEffect, useRef, useState } from 'react';

function OtpInputWithValidation({ numberOfDigits, getOTP }) {
    const otpBoxReference = useRef([]);
    const [otpArr, setOtpArr] = useState(new Array(numberOfDigits).fill(""));

    function handleChange(value, index) {
        let newArr = [...otpArr];
        newArr[index] = value;
        setOtpArr(newArr);

        if (value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus()
        }
    }

    function handleBackspaceAndEnter(e, index) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus();
        }
        if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    }

    const sendOTPToParent = useCallback(() => {
        const otpStr = otpArr.toString().replaceAll(",", "");
        getOTP(otpStr)
    }, [otpArr])


    useEffect(() =>{
        sendOTPToParent()
    }, [otpArr, sendOTPToParent])

    return (
        <div className='d-flex gap-1'>
            {otpArr.map((digit, index) => (
                <input
                    key={index}
                    value={digit}
                    maxLength={1}
                    style={{ width: "30px" }}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                    ref={(reference) => (otpBoxReference.current[index] = reference)}
                />
            ))}

        </div>
    );
}

export default OtpInputWithValidation;