import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";

export function FaqSection() {
  const faqItems = [
    {
      title: "Is this program for absolute beginners?",
      content: "Yes. Every client starts with a comprehensive assessment. If you can't do a push-up yet, we start with wall push-ups and negative regressions. The program scales infinitely.",
    },
    {
      title: "How many days a week do I need to train?",
      content: "Most clients train 3-4 days a week for 45-60 minutes. Consistency is more important than volume. We will find a cadence that fits your lifestyle.",
    },
    {
      title: "Do I need any equipment?",
      content: "For the first few months, a simple pull-up bar and the floor are enough. As you progress, gymnastic rings or parallettes may be recommended for advanced skills.",
    },
    {
      title: "How does the trial session work?",
      content: "You'll fill out your training profile and book a ₹49 live assessment. During this 35-minute video call, I will evaluate your mobility, form, and baseline strength to determine if we're a good fit for 1-on-1 coaching.",
    },
  ];

  return (
    <section id="faq" className="relative w-full bg-black py-24 sm:py-32 px-6 sm:px-8 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-zinc-400">
            Everything you need to know before booking your trial session.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
