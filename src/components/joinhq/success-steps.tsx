const steps = [
  { number: 1, text: "Consultation & Planning" },
  { number: 2, text: "Equipment Selection" },
  { number: 3, text: "Installation & Setup" },
  { number: 4, text: "Training" },
  { number: 5, text: "Ongoing Support" },
] as const;

export const SuccessSteps = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="mb-16 text-center text-4xl font-bold">
        Your Success. Our Priority
      </h2>

      <div className="mx-auto mb-16 grid max-w-4xl grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2B5741] text-2xl font-bold text-white">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-full top-1/2 h-[2px] w-[calc(100%+4rem)] -translate-y-1/2 bg-[#2B5741]" />
              )}
            </div>
            <p className="mt-4 max-w-[120px] text-center text-sm font-medium">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
