import Image from "next/image";

export default function JourneySection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-12 text-4xl font-bold text-gray-800">
          From Saturated Market to Thriving Wellness Destination, A Journey...
        </h2>

        <div className="space-y-8 text-lg leading-relaxed text-gray-700">
          <p className="text-xl">
            Like many wellness centre owners, Michael was struggling with:
          </p>

          <ul className="mx-auto max-w-2xl space-y-3">
            {[
              "Intense competition and market saturation",
              "Difficulty differentiating his services",
              "Attracting and retaining high-value clients",
              "Slow growth and inconsistent revenue",
            ].map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className="flex items-center justify-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-xl font-semibold">Sound all too familiar?</p>

          <p>
            Michael felt frustrated and overwhelmed. He knew that without a
            significant change, his dream of running a thriving wellness center
            might slip away.
          </p>

          <p>
            It started with float therapy and infrared saunas, and quickly grew
            to cryotherapy, redlight therapy and massage.
          </p>

          <p>
            The initial results were incredible, clients were getting results
            and kept coming back, business was good.
          </p>

          <p>
            But, before long, cheaper, lower quality and inferior equipment
            began flooding the market.
          </p>

          <p>
            People were ranging in their needs, from systemic inflammation,
            athletic injuries, disease and bodily dysfunction like poor sleep,
            cognition and energy and competitors knew this.
          </p>

          <p className="text-xl font-semibold">
            Despite more people needing help than ever, clinics like Michael
            were experiencing:
          </p>

          <ol className="mx-auto max-w-2xl space-y-4 text-left">
            {[
              "Price Wars with competitors offering similar services at rock-bottom prices",
              "Cheap home based imitations that offering inferior results distracted clients",
              "Indistinguishable Offerings as existing solutions struggled to stand out in a sea of infrared saunas and cryotherapy chambers",
              "Plateau in Growth with client numbers and revenue flatlining",
              "A growing number of clients seeking solutions beyond traditional treatments",
            ].map((item, index) => (
              <li key={item} className="flex items-start">
                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p>
            Michael knew he needed a game-changer – something that would set his
            center apart and tap into an unmet market need.
          </p>

          <p className="text-xl font-semibold">
            That&apos;s when he discovered Hyperbaric Oxygen Therapy (HBOT)....
          </p>
        </div>

        <div className="my-16 flex justify-center">
          <Image
            src="https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/4.png"
            alt="Artistic representation of wellness and growth"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <h3 className="mb-10 text-3xl font-semibold text-gray-800">
          Here&apos;s how this centre turned it all around with one
          game-changing decision and stood out.
        </h3>

        <div className="space-y-8 text-lg leading-relaxed text-gray-700">
          <p>
            At first, Michael was skeptical. Could one new treatment really make
            such a difference?
          </p>
          <p>
            But as he dug deeper, he realized HBOT could be the game-changer he
            was looking for.
          </p>
          <p>
            After extensive research and consultation with industry experts,
            Michael made the decision to invest in HBOT.
          </p>
          <p className="text-xl font-semibold">
            Here&apos;s why it was a turning point:
          </p>

          <ul className="mx-auto max-w-2xl space-y-4">
            {[
              "Cutting-Edge Treatment: HBOT offered a truly innovative service unlike anything in the market",
              "Scientifically Backed: Supported by numerous studies showing benefits for a wide range of conditions",
              "High-Value Service: Attracted clients willing to pay premium prices for advanced treatments",
              "Diverse Applications: From athletes to chronic illness sufferers, HBOT appealed to a broad client base",
              "Recurring Revenue: Many clients required multiple sessions, ensuring steady, predictable income",
            ].map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className="flex items-start">
                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-left">{item}</span>
              </li>
            ))}
          </ul>

          <p>
            With guidance, Michael carefully selected and implemented the
            perfect HBOT solution for his center.
          </p>

          <p>
            The journey wasn&apos;t easy, but after extensive consultation with
            industry experts, countless workshops and client onboardings,
            rigorous development of systems and processes to serve clients and
            safely treat them with effective protocols for their needs, results
            began to explode.
          </p>

          <p>
            Soon enough, sessions are now running from open to close, helping
            people dealing with disease, brain fog, recovery from surgery,
            athletes with all sorts of injuries, and persistent fatigue.
          </p>

          <p className="text-xl font-semibold">
            Within just 30 days of implementing HBOT, Michael&apos;s wellness
            center experienced:
          </p>

          <ul className="mx-auto max-w-2xl space-y-4">
            {[
              "$22,500+ increase in monthly revenue",
              "40% boost in client retention rates",
              "65% increase in new client acquisitions",
              "90% of HBOT clients booking recurring sessions",
              "Growing recognition as the go-to center for advanced wellness treatments in his area",
            ].map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className="flex items-center justify-center">
                <span className="mr-3 text-2xl text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mb-10 mt-16 text-3xl font-semibold text-gray-800">
          The impact went beyond just numbers...
        </h3>

        <div className="space-y-8 text-lg leading-relaxed text-gray-700">
          <p className="text-xl">
            Michael was now helping people he never could before:
          </p>

          <ul className="mx-auto max-w-2xl space-y-4">
            {[
              "Athletes recovering from injuries faster than ever",
              "Anti-Aging Enthusiasts became regular, loyal customers",
              "Chronic fatigue sufferers regaining their energy and vitality",
              "Brain fog patients experiencing mental clarity for the first time in years",
              "Post-surgery patients accelerating their healing process",
            ].map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className="flex items-center justify-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                {item}
              </li>
            ))}
          </ul>

          <blockquote className="my-12 border-l-4 border-blue-500 bg-white p-6 text-2xl font-bold italic text-gray-800 shadow-lg">
            &ldquo;I never imagined one decision could transform my business so
            dramatically. HBOT has not only revolutionised our offerings but has
            allowed us to truly change lives in our community.&rdquo;
          </blockquote>

          <p className="text-2xl font-bold text-gray-800">
            And now? Michael upgraded his chamber to help EVEN MORE people.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <Image
            src="https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/gallery/1.png"
            alt="HBOT Chamber"
            width={1200}
            height={400}
            className="rounded-lg object-contain shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
