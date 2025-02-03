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
import { loginAction, signupAction } from "@/redux/Action/authAction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getCategoryCourse } from "@/redux/Action/categoryAction";


export const Login = () => {
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const [inputSignup, setInputSignup] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    role:""
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryCourse())
  },[])

  const inputChangehandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setInputSignup((prev) => ({ ...prev, [name]: value }));
    } else {
      setInputLogin((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (value) => {
    setInputSignup((prev) => ({ ...prev, role: value }));
    // console.log("Role", value);
  };

  const handlerRegister = (type) => {
    const input = type === "signup" ? inputSignup : inputLogin;
    if (type === "signup") {
      dispatch(signupAction(input));
      setInputSignup({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        role: "",
      });
    } else {
      dispatch(loginAction(input, navigate));

      setInputLogin({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-20 py-2 mb-5">
        <Tabs defaultValue="signup" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={inputSignup.name}
                    placeholder="enter name"
                    onChange={(e) => inputChangehandler(e, "signup")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="enter email"
                    onChange={(e) => inputChangehandler(e, "signup")}
                    name="email"
                    value={inputSignup.email}
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="enter phone number"
                    onChange={(e) => inputChangehandler(e, "signup")}
                    name="phone_number"
                    value={inputSignup.phone_number}
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => inputChangehandler(e, "signup")}
                    name="password"
                    value={inputSignup.password}
                    required="true"
                  />
                </div>
                <div >
                  <RadioGroup className="flex " value={inputSignup.role}
                    onValueChange={handleRoleChange}>
                    <div className="flex items-center space-x-2 mt-3">
                      <RadioGroupItem value="learner" id="r1" />
                      <Label htmlFor="r1">Learner</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <RadioGroupItem value="mentor" id="r2" />
                      <Label htmlFor="r2">Mentor</Label>
                    </div>

                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handlerRegister("signup")}>
                  Signup
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={inputLogin.email}
                    onChange={(e) => inputChangehandler(e, "login")}
                    placeholder="enter email"
                    required="true"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={inputLogin.password}
                    onChange={(e) => inputChangehandler(e, "login")}
                    placeholder="enter password"
                    required="true"
                  />
                </div>

              </CardContent>
              <CardFooter>
                <Button onClick={() => handlerRegister("login")}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </>
  );
};
