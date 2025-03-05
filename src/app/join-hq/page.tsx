import Image from "next/image";
import ContactSection from "~/components/landing/sections/contact-section";
import { CTASubscriptionSection } from "~/components/landing/sections/cta-section";

const JoinHQPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full bg-black">
        <div className="absolute inset-0">
          <Image
            src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
            alt="HBOT Therapy Ecosystem"
            fill
            className="object-cover opacity-55"
          />
        </div>
        <div className="container relative mx-auto h-full">
          <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                JOIN THE WORLD&apos;S MOST ADVANCED HYPERBARIC OXYGEN THERAPY
                ECOSYSTEM.
              </h1>
              <p className="text-lg leading-relaxed text-white/90">
                Access the latest research. Find the best support. Get the best
                hyperbaric oxygen chambers, wellness products and services. All
                at your finger tips.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-20 text-center">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          The Science of health demands a new standard.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
          With more available than ever before, it is never been harder to know what information to trust, which products to choose and what protocols to follow. This is why we created our platform. We have designed a method that allows you to access a trusted source to process current, health assessed and easily curated supported and health and wellness products.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-50 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Our Mission</h2>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            To transform the current healthcare system into one that is proactive and data-driven — this is known as medicine 3.0
          </p>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            We help you sort the best things, make and heal illnesses earlier than ever before, and help us live like the best version of ourselves.
          </p>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            We envision a world where wellbeing is forethought & everyone is empowered to reach their peak potential.
          </p>
        </div>
      </div>

      {/* How We Do It Section */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">How We Do It</h2>
        <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          We have created tools to let you peek inside your inner workings, so you can take control of your health, navigate understanding your body and achieve your optimal wellness so you can move forward with confidence.
        </p>
        <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          From the latest research to cutting-edge devices, we offer education, assessments & protocols to meet your health needs and empower your choices and our team of top experts design a custom health strategy that works with you.
        </p>
        <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          We help provide access with the latest devices and scientific research, continually supported with tests, technologies, and protocols to support your specific requirements. Whether you're looking to optimize performance, recover from injury, or want to simply discover how best to tackle the rest of your life!
        </p>
        <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
          We know health can be complex, so we've made it simple. Want to find what matters most without the guesswork? We have protocols and plans to help you feel your best with our team of doctors & a universe of your health — no more empty claims!
        </p>
      </div>

      {/* Hyperbaric HQ Framework Section */}
      <div className="bg-gray-50 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Hyperbaric HQ Framework</h2>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            Disrupting hyperbaric oxygen therapy with bio-engineering.
          </p>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            HBOT-HQ is a specialized customer-centric research-led service from our team of O₂-HBOT applications, vetted protocols, and expert knowledge.
          </p>
          <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            Access exclusive technology, the latest research and reputable HBOT solutions — all in one place.
          </p>
          
          <div className="mb-8">
            <p className="mb-3 font-medium text-base text-gray-800 sm:text-lg">With the Hyperbaric HQ Framework, you gain access to:</p>
            <ul className="space-y-2 pl-4 text-base text-gray-700 sm:text-lg">
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 text-gray-800">•</span>
                <span className="leading-relaxed">Clinical research, trials and studies for numerous conditions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 text-gray-800">•</span>
                <span className="leading-relaxed">Best practice protocols for specific health needs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 text-gray-800">•</span>
                <span className="leading-relaxed">Up-to-date technology and all relevant insights from our community of models</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 text-gray-800">•</span>
                <span className="leading-relaxed">Carefully selected premium hyperbaric chambers and accessories</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1.5 text-gray-800">•</span>
                <span className="leading-relaxed">Personalized advice to Hyperbaric HBOT benefits and protocols</span>
              </li>
            </ul>
          </div>
          
          {/* Framework Diagram */}
          <div className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl py-6 sm:py-8">
            <div className="relative">
              <Image 
                src="/images/hyperbaric-framework.png" 
                alt="Hyperbaric HQ Framework Diagram"
                width={500}
                height={500}
                className="mx-auto object-contain w-full h-auto shadow-md rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-20 text-center">
        <CTASubscriptionSection />
      </div>
      
      <ContactSection />
    </div>
  );
};

export default JoinHQPage;
