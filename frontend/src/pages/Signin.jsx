import { BottomWarning } from "../components/ButtonWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useSetRecoilState, useRecoilValue } from "recoil";
import {  tempFirstNameAtom, tempLastNameAtom, tempEmailAtom, tempPasswordAtom } from "../store/atoms/signupAtom";
import { tokenAtom } from "../store/atoms/tokenAtom";

import React from 'react';

export default function Signin(){
  const setTempFirstName = useSetRecoilState(tempFirstNameAtom);
  const setTempLastName = useSetRecoilState(tempLastNameAtom);
  const setTempEmail = useSetRecoilState(tempEmailAtom);
  const setTempPassword = useSetRecoilState(tempPasswordAtom);
  const setToken= useSetRecoilState(tokenAtom);

  const tempFirstName = useRecoilValue(tempFirstNameAtom);
  const tempLastName = useRecoilValue(tempLastNameAtom);
  const tempEmail = useRecoilValue(tempEmailAtom);
  const tempPassword = useRecoilValue(tempPasswordAtom);

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: tempEmail,
          password: tempPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data) {
          alert('Sign in successful!');
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          alert('Sign in failed1: ' + data.message);
        }
      } else {
        alert('Sign in failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sign in failed!');
    }
  };


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="johndoe@gmail.com" label={"Email"} setTempValue={setTempEmail} />
          <InputBox placeholder="123456" label={"Password"} setTempValue={setTempPassword} />
          <div className="pt-4">
            <Button label={"Sign In"} onClick={handleSignUp} />
          </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}