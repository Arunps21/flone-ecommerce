import React from "react";

const Faq = () => {
  return (
    <>
      <section className="dark:bg-[#212121] dark:text-gray-500">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 mb-8 dark:text-gray-600">
            Have questions about shopping for men's wear? Find your answers
            here.
          </p>
          <div className="space-y-4">
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">
                What is the return policy for purchased items?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                You can return any item within 7 days of purchase as long as it
                is in its original condition with tags intact. For more details, 
                visit our return policy page.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">
                Do you offer international shipping?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Yes, we ship to selected countries worldwide. Shipping fees and
                delivery times may vary based on the destination.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">
                How do I determine the right size for me?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Please refer to our size guide available on every product page.
                If you're unsure, feel free to contact our support team for
                assistance.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">
                Are there any ongoing discounts or offers?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Yes, we often have seasonal sales and exclusive discounts for
                subscribers. Check our homepage or subscribe to our newsletter
                for updates.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
