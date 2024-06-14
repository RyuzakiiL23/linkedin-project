import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function OrderAccordion(props: any) {
  const orders = props.orders;
  return (
    <Accordion type="single" collapsible className="w-full">
    {orders.map((order: any) => (
      <AccordionItem value={order.id} key={order.id}>
        <AccordionTrigger>
            <div
            //   key={order.id}
              className="flex w-full relative justify-start items-center h-10"
            >
              <div className="p-2 text-start w-[30%]">{order.user_name}</div>
              <div className="p-2 text-start w-[30%]">{order.transaction_id}</div>
              <div className="p-2 text-start w-[30%]">{order.total_price}</div>
              <div className="p-2 text-start w-[10%]">
                {new Date(order.created_at).toLocaleString()}
              </div>
            </div>
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
          ))}
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Its animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
