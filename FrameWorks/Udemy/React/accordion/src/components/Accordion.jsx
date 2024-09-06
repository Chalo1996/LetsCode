import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ faqs }) => {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className='accordion'>
      {faqs.map((faq, index) => (
        <AccordionItem
          num={index + 1}
          title={faq.title}
          text={faq.text}
          curOpen={curOpen}
          onOpen={setCurOpen}
        >
          {faq.text}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
