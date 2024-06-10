"use client";
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
import { use, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function Sign(props: any) {
  const cookies = new Cookies(null, { path: "/" });
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  console.log(registerInfo);

  const onRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.baseURL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.access_token) {
        cookies.set("session", data.access_token);
        props.setDialog(false);
        props.setLogoutButton(true);
        cookies.set("user", data.role);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.baseURL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
     if (data.access_token) {
        cookies.set("session", data.access_token);
        cookies.set("user", data.role);
        props.setDialog(false);
        props.setLogoutButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="SignIn">SignIn</TabsTrigger>
        <TabsTrigger value="SignUp">SignUp</TabsTrigger>
      </TabsList>
      <TabsContent value="SignIn">
        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
            <CardDescription>Connect to your account</CardDescription>
          </CardHeader>
          <form onSubmit={onLogin}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, email: e.currentTarget.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setLoginInfo({
                      ...loginInfo,
                      password: e.currentTarget.value,
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">LogIn</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="SignUp">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>

          <form onSubmit={onRegister}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      name: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      email: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      password: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordConfirmation">Confirm password</Label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      passwordConfirmation: e.currentTarget.value,
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Create</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
