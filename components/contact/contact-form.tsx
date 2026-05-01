"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function ContactForm() {
  return (
    <Section className="py-24 bg-primary-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-primary-950 mb-6">
              Drop us a line
            </h2>
            <p className="text-lg text-primary-600 mb-12 max-w-lg leading-relaxed">
              Reach out directly via phone or email, or fill out the form and our team will get back to you promptly to discuss your organizational needs.
            </p>

            <div className="space-y-8">
              <a href="tel:7874709054" className="group flex items-center gap-6 p-6 rounded-3xl bg-white border border-primary-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-secondary-500 group-hover:text-white transition-colors duration-300 text-primary-950">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-xl font-medium text-primary-950">787-470-9054</p>
                </div>
              </a>

              <a href="mailto:jvj@adminservicespr.com" className="group flex items-center gap-6 p-6 rounded-3xl bg-white border border-primary-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-secondary-500 group-hover:text-white transition-colors duration-300 text-primary-950">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl font-medium text-primary-950">jvj@adminservicespr.com</p>
                </div>
              </a>

              <div className="flex items-center gap-6 p-6 rounded-3xl bg-primary-950 text-white border border-primary-800">
                <div className="w-14 h-14 rounded-full bg-primary-800 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-1">Entity Details</p>
                  <p className="text-sm font-medium leading-relaxed">
                    JVJ Consulting, LLC<br />
                    Unique Entity ID: VX64CYX89JG5<br />
                    PR OGPE 2024-607685-PU-374659
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-primary-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-primary-950 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-primary-50 border-transparent focus:border-secondary-500 focus:bg-white focus:ring-0 transition-all duration-300 text-primary-950 placeholder:text-primary-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary-950 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-primary-50 border-transparent focus:border-secondary-500 focus:bg-white focus:ring-0 transition-all duration-300 text-primary-950 placeholder:text-primary-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-primary-950 ml-1">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-primary-50 border-transparent focus:border-secondary-500 focus:bg-white focus:ring-0 transition-all duration-300 text-primary-950 placeholder:text-primary-400 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 bg-primary-950 hover:bg-secondary-600 text-white px-8 py-5 rounded-full font-bold text-lg transition-colors duration-300 mt-4"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-xs text-center text-primary-400 mt-6 px-4">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
