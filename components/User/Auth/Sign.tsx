'use client'
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
import loginAction from "@/lib/auth/loginAction";
import signUpAction from "@/lib/auth/signUpAction";

export function Sign() {

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
          <form action={loginAction}>
          <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input id="Email" type="email" name="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password"/>
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

          {/* Sign Up Form */}

          <form action={signUpAction}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" type="text" name="firstName" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" type="text" name="lastName" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input id="Email" type="email" name="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">New password</Label>
                <Input id="password" type="password" name="password"/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordConfirmation">Confirm password</Label>
                <Input id="passwordConfirmation" type="password" name="passwordConfirmatoin"/>
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
