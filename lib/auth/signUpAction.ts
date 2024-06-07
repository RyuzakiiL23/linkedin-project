"use server";

// import { formadataSerialisation } from "../utils";

export default async function signUpAction(formdata: FormData) {
  const name = formdata.get("firstName" + "lastName");
    const email = formdata.get("email");
    const password = formdata.get("password");

    const data = {
        name,
        email,
        password,
    }
//   console.log("form", formdata);
//   const formDataObj = formadataSerialisation(formdata);


  try {
    const res = await fetch(`${process.env.baseURL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (response.error) {
      throw new Error(response.error);
    }
    console.log(response);
    return response;
    //   localStorage.setItem("chat-user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return error;
  }
}
