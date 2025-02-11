import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-5xl bg-white mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Terms & Conditions
      </h1>

      {/* Section 1: Introduction */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Agreement</h2>
        <p className="text-gray-600">
          By accessing this webpage, you agree to be bound by these Terms and Conditions
          ("Terms") in a legally binding agreement between us ("Merchant", "we", "us", or
          "our") and the User ("you" or "your").
        </p>
      </section>

      {/* Section 2: Eligibility */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Eligibility</h2>
        <p className="text-gray-600">
          You represent and warrant that you have the legal right and authority to agree
          to these Terms and perform your obligations hereunder.
        </p>
      </section>

      {/* Section 3: Definitions */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Definitions</h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li>
            <strong>Payment Instrument:</strong> Includes credit/debit cards, UPI, IMPS,
            etc.
          </li>
          <li>
            <strong>Platform:</strong> Refers to the website where transactions occur.
          </li>
          <li>
            <strong>Transaction:</strong> Refers to the order or service request placed by
            you.
          </li>
        </ul>
      </section>

      {/* Section 4: Merchant's Rights */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Merchant's Rights</h2>
        <p className="text-gray-600">
          We may collect, store, and share your information to deliver the services you
          have requested.
        </p>
      </section>

      {/* Section 5: Your Responsibilities */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          5. Your Responsibilities
        </h2>
        <p className="text-gray-600">
          You agree to provide accurate and up-to-date information, including payment
          details and personal information, to complete transactions.
        </p>
      </section>

      {/* Section 6: Prohibited Actions */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          6. Prohibited Actions
        </h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Unauthorized use of the platform.</li>
          <li>Attempting to hack, reverse-engineer, or disrupt services.</li>
          <li>Engaging in fraudulent or misleading activities.</li>
        </ul>
      </section>

      {/* Section 7: Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-600">
          We are not responsible for damages, losses, or liabilities arising from your use
          of our platform, except as required by law.
        </p>
      </section>

      {/* Section 8: Governing Laws & Dispute Resolution */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          8. Governing Laws & Dispute Resolution
        </h2>
        <p className="text-gray-600">
          These Terms are governed by Indian law. Any disputes will be resolved through
          arbitration in Bengaluru, as per the Arbitration and Conciliation Act, 1996.
        </p>
      </section>

      {/* Section 9: Grievance Redressal */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          9. Grievance Redressal
        </h2>
        <p className="text-gray-600">
          For any complaints, please contact us via our support email at{" "}
          <span className="text-blue-600">support@ganeshmuseum.com</span>.
        </p>
      </section>

      {/* Section 10: Disclaimer */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Disclaimer</h2>
        <p className="text-gray-600">
          We do not guarantee that our platform will be free from bugs, viruses, or
          errors. Users are advised to use appropriate security measures.
        </p>
      </section>

      {/* Section: Final Note */}
      <p className="text-center text-gray-500 text-sm mt-8">
        Last Updated: <strong>February 2025</strong>
      </p>
    </div>
  );
};

export default TermsConditions;
