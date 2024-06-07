import Image from "next/image";
import React from "react";

export default function LeftSide(props: any) {
  const { product } = props;
  return (
    <div className="w-1/2 flex flex-col gap-8">
      <div className="border bg-background relative p-8">
        <Image src={product.image1} width={500} height={500} alt="product" />
      </div>

      <div className="border bg-background relative p-8">
        <h1 className="text-primary text-2xl font-bold">Product Details</h1>
        <p className="text-muted-foreground text-sm font-semibold">
          {product.description}
        </p>
      </div>

      <div className="border bg-background relative p-8">
        <h1 className="text-primary text-2xl font-bold">Livraison et Retoursk</h1>
        <p className="text-muted-foreground text-sm font-semibold">
          Dans quelles villes faites-vous la livraison ? Nous livrons partout au
          Maroc ( Marrakech, Casablanca, Rabat, Sale, Fès, Tanger, Tétouan,beni
          melal , Tiznit , kenitra , Nador , Oujda, Dakhla, Agadir, El-Jadida,
          Essaouira , Safi, Tanger…… ) via Amana et Aramex.
        </p>
      </div>
    </div>
  );
}
