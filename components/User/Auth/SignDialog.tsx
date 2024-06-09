"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sign } from "./Sign";
import Cookies from "universal-cookie";
import {useEffect, useState, useMemo } from "react";

export function SignDialog() {
  const cookies = useMemo(() => new Cookies(null, { path: "/" }), []);
  const [session, setSession] = useState<any>();
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    setSession(cookies.get("session"));
  }, [cookies]);
  console.log(cookies.get("session"));

  const onLogout = () => {
    cookies.remove("session");
    setSession('');
  };

  return (
    <div>
      {session === '' ? (
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">SignUp</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[465px]">
            <Sign setDialog={setDialog}/>
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
