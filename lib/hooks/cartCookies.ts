import Cookies from "universal-cookie";

export function cartCookies(value: any) {
  const cookies = new Cookies();
  const data = cookies.get("cart") || [];

  if (data.length === 0) {
    cookies.set("cart", value, { path: "/" });
    return;
  }

  let itemExists = false;
  const newData = data.map((item: any) => {
    if (item.id === value.id) {
      itemExists = true;
      if (item.quantity !== value.quantity) {
        return {
          ...item,
          quantity: value.quantity,
        };
      }
    }
    return item;
  });

  if (!itemExists) {
    newData.push(value);
  }

  cookies.set("cart", newData, { path: "/" });
  return;
}

export function removeItemFromCart(id: any) {
  const cookies = new Cookies();
  const data = cookies.get("cart") || [];

  const newData = data.filter((item: any) => item.id !== id);

  cookies.set("cart", newData, { path: "/" });
}