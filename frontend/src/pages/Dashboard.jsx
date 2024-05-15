import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import {InputBox} from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export default function Dashboard()
{
    return(
        <div className="flex-col justify-center items-center">
            <Heading label={"Sign up"}></Heading>
            <SubHeading content={"Enter Your Information to Create an Account"}></SubHeading>
            <InputBox label={"First Name"} placeholder={"John"}></InputBox>
            <Button label={"Sign up"} onClick></Button>
        </div>
    )
}