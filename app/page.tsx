"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useChat } from "ai/react";
import {
  ArrowRight,
  Play,
  Dumbbell,
  Activity,
  Flame,
  Menu,
  X,
  MessageSquare,
  Bot,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // AI Chat Logic
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      { id: "1", role: "assistant", content: "Welcome to Apex Forge. I can help you find the right membership, book a tour, or answer training questions. What are your main goals for this year?" }
    ]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Calculator State
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(180); // lbs or kg
  const [height, setHeight] = useState(70); // inches or cm
  const [activity, setActivity] = useState<number>(1.55); // Multiplier

  // Calculated Results
  const [bmi, setBmi] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    // Basic calculator logic
    const weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    const heightCm = unit === "imperial" ? height * 2.54 : height;

    if (heightCm > 0) {
      const currentBmi = weightKg / Math.pow(heightCm / 100, 2);
      setBmi(parseFloat(currentBmi.toFixed(1)));
    }

    // Mifflin-St Jeor (assuming male for demo purposes, could add gender toggle)
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    setCalories(Math.round(bmr * activity));
  }, [age, weight, height, activity, unit]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F3F4F6] selection:bg-[#FF2A2A] selection:text-white">
      {/* 3. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/10 bg-black/40">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Flame className="text-[#FF2A2A]" size={28} />
            <span className="text-xl md:text-2xl font-black tracking-widest uppercase font-heading text-white whitespace-nowrap leading-none mt-1">
              APEX FORGE
            </span>
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-400 font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase ml-9">Elite Training Facility</span>
        </div>

        {/* Center - Desktop Links */}
        <div className="hidden lg:flex flex-[2] items-center justify-center gap-8 font-medium text-sm tracking-wide">
          {["Facility", "Trainers", "Membership", "The Forge"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="relative group transition-colors hover:text-[#FF2A2A] whitespace-nowrap"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF2A2A] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-6">
          <button className="text-white/60 hover:text-white transition-colors text-sm font-medium whitespace-nowrap hidden xl:block">
            Member Login
          </button>
          <a href="#membership" className="bg-[#FF2A2A] hover:bg-[#ff4242] text-[#050505] font-bold px-6 py-2.5 rounded-sm transition-all transform hover:scale-105 uppercase tracking-wide text-sm shadow-[0_0_15px_rgba(255,42,42,0.3)] whitespace-nowrap">
            Claim 7-Day Pass
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center gap-8 text-2xl font-heading uppercase tracking-widest">
          {["Facility", "Trainers", "Membership", "The Forge"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-white hover:text-[#FF2A2A] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="#membership" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 bg-[#FF2A2A] text-[#050505] font-bold px-8 py-4 rounded-sm">
            Claim 7-Day Pass
          </a>
        </div>
      )}

      {/* 2 & 4. BACKGROUND & HERO MEDIA & CONTENT */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cinematic Static Image Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-[#050505] z-10 pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Dark Gym"
            className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 text-sm text-gray-300 font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-pulse"></span>
            Voted #1 Elite Facility in Austin
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-black capitalize leading-[0.85] tracking-tighter w-full"
            style={{ fontSize: "clamp(48px, 10vw, 120px)" }}
          >
            <span className="block text-white">FORGE YOUR</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              ULTIMATE FORM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-[600px] text-gray-400 text-lg md:text-xl font-medium leading-relaxed"
          >
            Stop exercising. Start training. Join the elite community of
            athletes, professionals, and lifters who demand more from their
            facility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a href="#membership" className="group relative flex items-center gap-2 bg-[#FF2A2A] text-black px-8 py-4 font-bold uppercase tracking-wide rounded-sm overflow-hidden w-full sm:w-auto justify-center hover:scale-105 hover:shadow-[0_0_30px_rgba(255,42,42,0.4)] transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2 text-black">
                Join The Forge <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0 opacity-20"></div>
            </a>
            <a href="#calculator" className="group flex items-center gap-2 px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold uppercase tracking-wide rounded-sm hover:bg-white/10 hover:border-white/40 transition-all w-full sm:w-auto justify-center">
              <Activity size={20} className="text-[#FF2A2A] group-hover:scale-110 transition-transform" /> Calculate Metrics
            </a>
          </motion.div>
        </div>
      </section>

      {/* 6. FEATURES & SOCIAL PROOF STRIP */}
      <section id="facility" className="relative z-20 py-24 border-y border-white/5 overflow-hidden">
        {/* Background Image for Facility Section */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" alt="Gym Elements" className="w-full h-full object-cover opacity-[0.10]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Social Proof Restyled */}
          <div className="mb-24 text-center">
            <p className="text-sm font-bold text-[#FF2A2A] uppercase tracking-widest mb-8">Featuring Competition-Grade Equipment From</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="px-8 py-4 border border-white/10 bg-[#111111] rounded-sm opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-2xl md:text-3xl font-heading font-black tracking-widest text-white tracking-[0.2em]">ELEIKO</span>
              </div>
              <div className="px-8 py-4 border border-white/10 bg-[#111111] rounded-sm opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-2xl md:text-3xl font-heading font-black tracking-widest text-white tracking-[0.2em]">ROGUE</span>
              </div>
              <div className="px-8 py-4 border border-white/10 bg-[#111111] rounded-sm opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-2xl md:text-3xl font-heading font-black tracking-widest text-white tracking-[0.1em]">HAMMER STRENGTH</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Dumbbell className="text-[#FF2A2A]" size={40} />,
                title: "Premium Equipment",
                desc: "Custom calibrated plates, competition racks, and tailored specialist machines for peak performance.",
              },
              {
                icon: <Activity className="text-[#FF2A2A]" size={40} />,
                title: "24/7 Access",
                desc: "Secure biometric entry for our elite members. Train on your schedule, without compromise.",
              },
              {
                icon: <Flame className="text-[#FF2A2A]" size={40} />,
                title: "Recovery Zone",
                desc: "Accelerate recovery with cold plunges, infrared saunas, and pneumatic compression therapy.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/5 bg-[#111111] hover:bg-[#151515] transition-colors rounded-sm group"
              >
                <div className="mb-6 p-4 bg-white/5 inline-block rounded-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 tracking-wide uppercase">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: TRAINERS SECTION */}
      <section id="trainers" className="relative py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF2A2A]/5 via-[#050505] to-[#050505]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-4">
              Elite <span className="text-[#FF2A2A]">Trainers</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Learn from the best. Our coaches have trained professional athletes, powerlifters, and Olympians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Marcus Thorne", role: "Head of Strength", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
              { name: "Sarah Vance", role: "Performance Specialist", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2070&auto=format&fit=crop" },
              { name: "David Chen", role: "Recovery & Mobility", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" }
            ].map((trainer, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-sm border border-white/10 aspect-[3/4]">
                <img src={trainer.img} alt={trainer.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-[#FF2A2A] font-bold text-sm tracking-widest uppercase mb-1">{trainer.role}</p>
                  <h3 className="text-2xl font-heading font-bold text-white uppercase">{trainer.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: THE FORGE (IMAGE GALLERY) */}
      <section id="the-forge" className="relative py-24 border-b border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-4">
                Inside <span className="text-[#FF2A2A]">The Forge</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                A 20,000 sq ft playground for the dedicated. No distractions, just iron and focus.
              </p>
            </div>
            <a href="#the-forge" className="hidden md:flex items-center gap-2 text-white hover:text-[#FF2A2A] transition-colors font-bold uppercase tracking-wide group">
              View All Gallery <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {/* Replace standard stock with aesthetic gym shots */}
            <div className="col-span-2 row-span-2 relative rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Gym wide" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div className="relative rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" alt="Racks" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div className="relative rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" alt="Plates" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div className="col-span-2 relative rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop" alt="Dumbbells" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SECTION: "THE APEX METRIC CALCULATOR" */}
      <section id="calculator" className="py-32 relative overflow-hidden bg-[#050505]">
        {/* Glow behind calculator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2A2A]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-20">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-4">
              The Apex Metric <span className="text-[#FF2A2A]">Calculator</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Your baseline determines your progress. Uncover your precise metabolic requirements to fuel elite performance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative z-20">
            <motion.div
              whileHover={{ rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#111111] border border-white/10 rounded-sm p-8 md:p-12 shadow-2xl relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-300">Measurement System</span>
                      <span className="text-xs text-gray-500 mt-1">Choose lbs/inches or kg/cm</span>
                    </div>
                    <div className="flex bg-white/5 rounded-sm p-1 border border-white/10">
                      <button
                        onClick={() => setUnit("imperial")}
                        className={cn(
                          "px-4 py-1.5 text-sm font-bold rounded-sm transition-colors",
                          unit === "imperial"
                            ? "bg-[#FF2A2A] text-black"
                            : "text-gray-400 hover:text-white"
                        )}
                      >
                        Imperial
                      </button>
                      <button
                        onClick={() => setUnit("metric")}
                        className={cn(
                          "px-4 py-1.5 text-sm font-bold rounded-sm transition-colors",
                          unit === "metric"
                            ? "bg-[#FF2A2A] text-black"
                            : "text-gray-400 hover:text-white"
                        )}
                      >
                        Metric
                      </button>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold">
                      <label className="text-gray-300">Age</label>
                      <span className="text-[#FF2A2A]">{age} years</span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="80"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full accent-[#FF2A2A] h-1.5 bg-white/10 rounded-full appearance-none outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold">
                      <label className="text-gray-300">Weight</label>
                      <span className="text-[#FF2A2A]">
                        {weight} {unit === "imperial" ? "lbs" : "kg"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={unit === "imperial" ? 100 : 45}
                      max={unit === "imperial" ? 350 : 160}
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full accent-[#FF2A2A] h-1.5 bg-white/10 rounded-full appearance-none outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold">
                      <label className="text-gray-300">Height</label>
                      <span className="text-[#FF2A2A]">
                        {unit === "imperial"
                          ? `${Math.floor(height / 12)}'${height % 12}"`
                          : `${height} cm`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={unit === "imperial" ? 60 : 150}
                      max={unit === "imperial" ? 84 : 210}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full accent-[#FF2A2A] h-1.5 bg-white/10 rounded-full appearance-none outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-300 block">
                      Activity Level
                    </label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(Number(e.target.value))}
                      className="w-full bg-[#050505] border border-white/10 text-white rounded-sm py-3 px-4 outline-none focus:border-[#FF2A2A] transition-colors appearance-none"
                    >
                      <option value={1.2}>Sedentary (Little/no exercise)</option>
                      <option value={1.375}>Light Active (1-3 days/wk)</option>
                      <option value={1.55}>Active (3-5 days/wk)</option>
                      <option value={1.725}>Very Active (6-7 days/wk)</option>
                      <option value={1.9}>Elite Athlete (2x day)</option>
                    </select>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-[#050505] rounded-sm p-8 border border-white/5 flex flex-col justify-center">
                  <div className="mb-8">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                      BMI Score
                    </p>
                    <div className="text-5xl font-heading font-black text-white">
                      {bmi > 0 ? bmi : "--"}
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Maintenance Target
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-heading font-black text-[#FF2A2A]">
                        {calories > 0 ? calories : "----"}
                      </span>
                      <span className="text-gray-400 font-bold">kcal</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <a href="#membership" className="w-full flex items-center justify-center gap-2 bg-[#FF2A2A] hover:bg-[#ff4040] text-black font-bold uppercase tracking-wide py-4 px-6 rounded-sm shadow-[0_0_15px_rgba(255,42,42,0.2)] hover:shadow-[0_0_30px_rgba(255,42,42,0.5)] transition-all duration-300 group hover:-translate-y-1">
                      See Memberships
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      Unlocks complete macro breakdown & email course.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: MEMBERSHIP PRICING SECTION */}
      <section id="membership" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-4">
              Join <span className="text-[#FF2A2A]">The Elite</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No hidden fees. No basic tiers. Full access to a facility designed for those who put the work in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 7-Day Pass */}
            <div className="bg-[#111111] border border-white/10 rounded-sm p-8 flex flex-col justify-between hover:border-[#FF2A2A]/50 transition-colors">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase mb-2">7-Day Pass</h3>
                <p className="text-gray-400 text-sm mb-6">Experience the elite standard. Full facility access for a week to see if you have what it takes.</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white font-heading">$0</span>
                  <span className="text-gray-500 font-bold ml-2">/ 7 days</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF2A2A]" /> Temporary Access Pass</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF2A2A]" /> Competition-Grade Area</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF2A2A]" /> Recovery Zone Access</li>
                </ul>
              </div>
              <button className="w-full bg-white/10 text-white font-bold uppercase tracking-wide py-4 rounded-sm hover:bg-white/20 transition-colors">
                Claim Pass
              </button>
            </div>

            {/* Standard Membership */}
            <div className="bg-[#111111] border border-white/10 rounded-sm p-8 flex flex-col justify-between hover:border-[#FF2A2A]/50 transition-colors">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase mb-2">The Forge Pass</h3>
                <p className="text-gray-400 text-sm mb-6">Complete 24/7 access to the entire facility, all premium equipment, and recovery zones.</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white font-heading">$149</span>
                  <span className="text-gray-500 font-bold ml-2">/ month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF2A2A]" /> 24/7 Biometric Access</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF2A2A]" /> Competition-Grade Area</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-[#FF2A2A]" /> Cold Plunge & Sauna</li>
                </ul>
              </div>
              <button className="w-full bg-white text-black font-bold uppercase tracking-wide py-4 rounded-sm hover:bg-gray-200 transition-colors">
                Select Plan
              </button>
            </div>

            {/* Elite / Coaching Membership */}
            <div className="bg-[#1a0505] border border-[#FF2A2A]/40 rounded-sm p-8 flex flex-col justify-between relative shadow-[0_0_30px_rgba(255,42,42,0.1)]">
              <div className="absolute top-0 right-0 bg-[#FF2A2A] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-bl-sm">
                Most Popular
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase mb-2">Apex Athlete</h3>
                <p className="text-[#FF2A2A] opacity-80 text-sm mb-6">Everything in The Forge Pass, plus personalized 1-on-1 coaching and custom macro programming.</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-[#FF2A2A] font-heading">$299</span>
                  <span className="text-gray-500 font-bold ml-2">/ month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-200">
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-white" /> Complete Elite Facility Access</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-white" /> 2x Personal Training Sessions/mo</li>
                  <li className="flex items-center gap-2"><ArrowRight size={16} className="text-white" /> Custom Diet & Macro App Access</li>
                </ul>
              </div>
              <button className="w-full bg-[#FF2A2A] text-black font-bold uppercase tracking-wide py-4 rounded-sm hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all">
                Join As Athlete
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FLOATING AI LEAD GEN WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-80 h-[400px] bg-[#111111] border border-white/10 rounded-sm shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-[#050505] p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot className="text-[#FF2A2A]" size={20} />
                <span className="font-bold text-white text-sm">Forge AI Coach</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto pattern-grid bg-[#050505]/50 scroll-smooth">
              {messages.map(m => (
                <div key={m.id} className={cn("text-sm p-3 rounded-lg w-[85%] border border-white/5", m.role === 'user' ? "bg-[#FF2A2A] text-black ml-auto rounded-tr-sm" : "bg-[#1a1a1a] text-gray-200 rounded-tl-sm")}>
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-[#1a1a1a] text-sm text-gray-400 p-3 rounded-lg rounded-tl-sm w-[85%] border border-white/5 animate-pulse">
                  Forge is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-[#050505] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your answer..."
                className="flex-1 bg-transparent border border-white/10 rounded-sm px-3 py-2 text-sm text-white outline-none focus:border-[#FF2A2A] transition-colors"
                disabled={isLoading}
              />
              <button disabled={isLoading || !input.trim()} type="submit" className="bg-[#FF2A2A] p-2 rounded-sm text-black hover:bg-white transition-colors disabled:opacity-50">
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="group relative flex items-center gap-4">
            <div className="absolute right-16 px-4 py-2 bg-[#111111] border border-white/10 text-white text-sm font-bold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              Ask our AI Coach...
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 bg-[#FF2A2A] rounded-full flex items-center justify-center text-black shadow-lg shadow-[#FF2A2A]/20 hover:scale-110 hover:shadow-[#FF2A2A]/40 transition-all z-10"
            >
              <MessageSquare size={24} />
            </button>
          </div>
        )}
      </div>

      {/* NEW: CONTACT FORM & FOOTER */}
      <section id="contact" className="py-24 relative bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-6">
                Ready to <span className="text-[#FF2A2A]">Commit?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                Reach out to schedule a private tour, discuss elite coaching options, or ask about corporate memberships.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#111111] p-3 rounded-sm border border-white/10 text-[#FF2A2A]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-1">Facility Location</h4>
                    <p className="text-gray-400">1200 Ironworks Blvd, Suite 100<br />Austin, TX 78701</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#111111] p-3 rounded-sm border border-white/10 text-[#FF2A2A]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-1">Direct Line</h4>
                    <p className="text-gray-400">+1 (512) 555-0199</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#111111] p-3 rounded-sm border border-white/10 text-[#FF2A2A]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-1">Email inquiries</h4>
                    <p className="text-gray-400">train@apexforge.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#111111] p-8 md:p-10 border border-white/10 rounded-sm shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2A2A]/5 blur-[50px] pointer-events-none rounded-full"></div>
              <h3 className="text-2xl font-heading font-bold text-white uppercase mb-8">Send a Message</h3>
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wide">First Name</label>
                    <input type="text" className="w-full bg-[#050505] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-[#FF2A2A] outline-none transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wide">Last Name</label>
                    <input type="text" className="w-full bg-[#050505] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-[#FF2A2A] outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
                  <input type="email" className="w-full bg-[#050505] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-[#FF2A2A] outline-none transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wide">Your Message</label>
                  <textarea rows={4} className="w-full bg-[#050505] border border-white/10 text-white px-4 py-3 rounded-sm focus:border-[#FF2A2A] outline-none transition-colors resize-none" placeholder="How can we help you achieve your goals?"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#FF2A2A] text-black font-bold uppercase tracking-widest py-4 px-6 rounded-sm shadow-[0_0_15px_rgba(255,42,42,0.2)] hover:shadow-[0_0_30px_rgba(255,42,42,0.4)] transition-all hover:-translate-y-1">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 bg-[#050505] relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 md:gap-0">
            <div className="flex items-center gap-2">
              <Flame className="text-[#FF2A2A]" size={28} />
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black tracking-widest uppercase font-heading text-white whitespace-nowrap leading-none mt-1">
                  APEX FORGE
                </span>
                <span className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Elite Training Facility</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="p-3 bg-[#111111] rounded-sm text-gray-400 hover:text-white hover:bg-[#FF2A2A] transition-all border border-white/5 group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-[#111111] rounded-sm text-gray-400 hover:text-white hover:bg-[#FF2A2A] transition-all border border-white/5 group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-[#111111] rounded-sm text-gray-400 hover:text-white hover:bg-[#FF2A2A] transition-all border border-white/5 group">
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500">
            <p suppressHydrationWarning>&copy; {new Date().getFullYear()} APEX FORGE FITNESS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
