'use client'
import { useState, useEffect, useMemo } from "react";
import Cookies, { CookieSetOptions } from "universal-cookie";

type UseCookiesResult = {
  cookies: Cookies;
  session: string | null;
  user: string | null;
  setCookie: (name: string, value: string, options?: CookieSetOptions) => void;
  removeCookie: (name: string, options?: CookieSetOptions) => void;
};

export const useCookies = (): UseCookiesResult => {
  const cookies = useMemo(() => new Cookies(null, { path: "/" }), []);
  const [session, setSession] = useState<string | null>(null);
  const [user , setUser] = useState<string | null>(null);

  useEffect(() => {
    const sessionCookie = cookies.get("session");
    const userCookie = cookies.get("user");
    setUser(userCookie || "");
    setSession(sessionCookie || "");
  }, [cookies]);

  const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
    cookies.set(name, value, { path: "/", ...options });
    if (name === "session") {
      setSession(value);
    }
  };

  const removeCookie = (name: string, options?: CookieSetOptions) => {
    cookies.remove(name, { path: "/", ...options });
    if (name === "session") {
      setSession("");
    }
  };

  return {
    user,
    cookies,
    session,
    setCookie,
    removeCookie,
  };
};
