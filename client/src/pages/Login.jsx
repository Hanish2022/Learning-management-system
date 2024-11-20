import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
    //make state variables for handling inputs
    const [signupInput, setSignupInput] = useState({name:"",  email: "",password: "",});
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    //step2: change the input acc to the user typing into it and mention name and value in input for particular name email pass etc 
    const changeInputHandler = (e, type) => {
       const { name, value } = e.target;
       if (type === "signup") {
         setSignupInput({ ...signupInput, [name]: value });
       } else {
         setLoginInput({ ...loginInput, [name]: value });
       }
    };
     const handleRegistration = async (type) => {
       const inputData = type === "signup" ? signupInput : loginInput;
    //    const action = type === "signup" ? registerUser : loginUser;
         //    await action(inputData);
         console.log(signupInput);
          console.log(loginInput);
     };
    return (
      <div className="flex items-center w-full justify-center">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">SignUp</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>SignUp</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"//same name rakho as u did in state variables
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="hanish"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="hanish@gmail.com"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="xyz"
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleRegistration("signup")}>
                  SignUp
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login your password here. After signup, you'll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="hanish@gmail.com"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="xyz"
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleRegistration("login")}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}

export default Login