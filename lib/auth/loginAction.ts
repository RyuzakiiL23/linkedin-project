"use server";

export default async function loginAction(formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  const data = {
    email,
    password,
  };

  console.log("data", JSON.stringify(data))

  try {
    const res = await fetch(`${process.env.baseURL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  } catch (error) {
    console.log(error);
    // return error;
  }
}
