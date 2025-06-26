import { PricingSection } from "@/components/PricingSection";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
            Start for free, upgrade when you're ready to download. Choose the plan that works best for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-1 mb-4 text-sm sm:text-base">
            <span className="text-green-600 font-medium">✓ No hidden fees</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="text-green-600 font-medium">✓ Instant access</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="text-green-600 font-medium">✓ Money-back guarantee</span>
          </div>
        </div>
      </section>

      <PricingSection />

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Can I use the resume builder for free?</h3>
              <p className="text-sm sm:text-base text-gray-600">Yes! You can create and preview your resume completely free. You only need to pay when you want to download the PDF.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Are the templates ATS-friendly?</h3>
              <p className="text-sm sm:text-base text-gray-600">Absolutely! All our templates are designed to pass through Applicant Tracking Systems (ATS) to ensure your resume gets seen by hiring managers.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm sm:text-base text-gray-600">We accept all major payment methods through Razorpay, including credit cards, debit cards, UPI, and net banking.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Can I edit my resume after downloading?</h3>
              <p className="text-sm sm:text-base text-gray-600">Yes! Your resume data is saved to your account, so you can always come back to edit and download updated versions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of professionals who've upgraded their careers with ResumeForge
          </p>
          <a href="/builder">
            <button className="bg-white text-blue-600 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
              Start Building Now
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Pricing;