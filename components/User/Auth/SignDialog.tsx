"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sign } from "./Sign";
import Cookies from "universal-cookie";
import { useEffect, useState, useMemo } from "react";

export function SignDialog() {
  const cookies = useMemo(() => new Cookies(null, { path: "/" }), []);
  const [session, setSession] = useState<string | null>(null);
  const [dialog, setDialog] = useState(false);
  const [logoutButton, setLogoutButton] = useState(false);

  useEffect(() => {
    // Client-side check for the session cookie
    const sessionCookie = cookies.get("session");
    setSession(sessionCookie || "");
  }, [cookies]);

  const onLogout = async () => {
    try {
      const res = await fetch(`${process.env.baseURL}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${cookies.get("session")}`,
        },
      });
      console.log(res);
      // Remove the session cookie and update state
      cookies.remove("session");
      cookies.remove("user");
      setSession("");
      setLogoutButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (session === null) {
    // While checking the auth status, return null or a loading state
    return(
              <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">loading</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[465px]">
            <Sign setLogoutButton={setLogoutButton} setDialog={setDialog} />
          </DialogContent>
        </Dialog>
    );
  }

  return (
    <div>
      {session === "" && !logoutButton ? (
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">SignUp</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[465px]">
            <Sign setLogoutButton={setLogoutButton} setDialog={setDialog} />
          </DialogContent>
        </Dialog>
      ) : (
        <Button onClick={onLogout} variant="outline">
          LogOut
        </Button>
      )}
    </div>
  );
}
