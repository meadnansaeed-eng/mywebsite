"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8 grid gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question} className="rounded-lg border bg-white shadow-lg">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="text-lg font-black md:text-xl">
                {faq.question}
              </span>

              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-500 text-lg font-black text-white">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6">
                <p className="leading-7 text-slate-600">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
