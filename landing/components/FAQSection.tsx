"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
type FAQItem = {
  question: string
  answer: string
}
type FAQSectionProps = {
  title?: string
  faqs?: FAQItem[]
}
const defaultFAQs: FAQItem[] = [
  {
    question: "What is Virtual Lab and who is it for?",
    answer:
      "Virtual Lab is a modern university academic platform built for students in B.Tech, BCA, and B.Sc CS courses. It provides a clean, minimalistic interface to access subjects, practicals, study notes, interview preparation questions, and viva quizzes — all in one place. Whether you're preparing for a practical exam, placement season, or a semester viva, Virtual Lab has you covered.",
  },
  {
    question: "How does the interactive code editor work?",
    answer:
      "The IDE provides a full-screen split-view layout with the problem statement on the left and a code editor on the right. It supports C, C++, Java, and Python with syntax highlighting via CodeMirror. Code is executed in real-time using the Piston API, so you get immediate output without leaving the platform. Solution hints are also available on demand.",
  },
  {
    question: "What types of questions are available for interview and viva prep?",
    answer:
      "Virtual Lab offers two categories for interview prep: MCQ Questions that open in a focused tab with interactive answer submission and instant feedback, and Coding Questions that open directly in the full-screen IDE with the problem statement pre-loaded. Viva Questions are MCQ-based with difficulty levels (Easy, Medium, Hard), instant feedback, and detailed explanations to help you understand each answer.",
  },
]
export const FAQSection = ({ title = "Frequently asked questions", faqs = defaultFAQs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <h2
              className="text-[40px] leading-tight font-normal text-[#202020] tracking-tight sticky top-24"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: "400",
                fontSize: "40px",
              }}
            >
              {title}
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-lg leading-7 text-[#202020] pr-8"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                        fontWeight: "400",
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-[#202020]" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p
                            className="text-lg leading-6 text-[#666666]"
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
