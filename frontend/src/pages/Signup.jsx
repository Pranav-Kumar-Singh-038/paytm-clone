import { BottomWarning } from "../components/ButtonWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { firstNameAtom, lastNameAtom, tempFirstNameAtom, tempLastNameAtom, tempEmailAtom, tempPasswordAtom, passwordAtom, emailAtom } from "../store/atoms/signupAtom";

export default function Signup() {
  const setTempFirstName = useSetRecoilState(tempFirstNameAtom);
  const setTempLastName = useSetRecoilState(tempLastNameAtom);
  const setTempEmail = useSetRecoilState(tempEmailAtom);
  const setTempPassword = useSetRecoilState(tempPasswordAtom);

  const tempFirstName = useRecoilValue(tempFirstNameAtom);
  const tempLastName = useRecoilValue(tempLastNameAtom);
  const tempEmail = useRecoilValue(tempEmailAtom);
  const tempPassword = useRecoilValue(tempPasswordAtom);

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: tempEmail,
          firstName: tempFirstName,
          lastName: tempLastName,
          password: tempPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data) {
          alert('Sign up successful!');
        } else {
          alert('Sign up failed1: ' + data.message);
        }
      } else {
        alert('Sign up failed2: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sign up failed!');
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox placeholder="John" label={"First Name"} setTempValue={setTempFirstName} />
          <InputBox placeholder="Doe" label={"Last Name"} setTempValue={setTempLastName} />
          <InputBox placeholder="johndoe@gmail.com" label={"Email"} setTempValue={setTempEmail} />
          <InputBox placeholder="123456" label={"Password"} setTempValue={setTempPassword} />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={handleSignUp} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}
