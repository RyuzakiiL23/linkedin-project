import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
            <CardDescription>
              Connect to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="email@exp.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Username</Label>
              <Input id="password" type="password" placeholder="******" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>LogIn</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="SignUp">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>
                Create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordConfirmation">Confirm password</Label>
              <Input id="passwordConfirmation" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Create</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
