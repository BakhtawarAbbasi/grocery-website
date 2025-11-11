"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Gift, ShoppingCart, BadgePercent, Trophy, ChevronRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const LuckyDrawBanner: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative lg:px-40  w-full bg-gradient-to-br from-[#fdf4ff] via-[#faf5ff] to-[#ede9fe] px-4 py-16 md:px-6 lg:py-24 overflow-hidden">
      {/* sparkles */}
      <motion.div
        className="absolute text-purple-400 top-10 left-10"
        animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute text-purple-400 bottom-12 right-12"
        animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      <div className="flex flex-col items-center gap-10 mx-auto max-w-7xl md:flex-row md:items-stretch">
        {/* Left Image */}
        <motion.div
          className=" f md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative w-full max-w-md cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? -1.5 : 0,
              boxShadow: isHovered
                ? "0 25px 60px -15px rgba(147, 51, 234, 0.4)"
                : "0 15px 40px -10px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="relative overflow-hidden shadow-2xl ">
              <Image
                src="/images/gift.jpeg"
                alt="Lucky Draw Gift"
                width={500}
                height={500}
                className="object-cover w-full h-auto "
                priority
              />
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-300/40 to-pink-300/40 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="flex items-stretch w-full md:w-1/2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden bg-white/80 backdrop-blur-md border border-purple-100 shadow-xl hover:shadow-[0_25px_60px_-12px_rgba(147,51,234,0.4)] transition-all duration-500 w-full rounded-3xl">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-[#9333EA] to-[#7E22CE] p-2">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 12, -12, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Trophy className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Shop More, Win More! 🎯! <span className="text-yellow-300">🎁</span>
                  </h2>
                  <motion.p
                    className="text-sm font-medium text-purple-100 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    More shopping = more chances to win exciting prizes!
                  </motion.p>
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="px-4 py-2 space-y-3">
              <div className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] p-4 rounded-2xl border border-purple-200 shadow-inner">
                <motion.p
                  className="text-base font-semibold leading-relaxed text-purple-700"
                  whileHover={{ x: 5 }}
                >
                 Apni grocery shopping ko banaiye aur bhi exciting! Ab har order ke saath mile aapko Lucky Draw Entry jitni zyada shopping, utne zyada winning chances🏆
                </motion.p>

                <div className="mt-1 space-y-2">
                  {[
                    "🎉 Apni pasand ki grocery items cart me add karein.",
                    "🛒 Checkout complete karte hi aap automatically Lucky Draw me shamil ho jaenge",
                    "💰 Har 2000Rs ki shopping par milega ek additional entry jitna zyada khareedoge, utne zyada chances!",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-1 transition-all rounded-lg hover:bg-purple-50"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-3 gap-5 text-center">
                {[
                  { icon: <ShoppingCart className="w-6 h-6 mx-auto text-purple-600" />, text: "Shop" },
                  { icon: <BadgePercent className="w-6 h-6 mx-auto text-purple-600" />, text: "Get Entries" },
                  { icon: <Gift className="w-6 h-6 mx-auto text-purple-600" />, text: "Win" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-3 transition-all border-2 border-purple-100 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl hover:border-purple-500 group"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="p-1 transition-colors bg-purple-50 rounded-xl group-hover:bg-purple-100">
                      {item.icon}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-700">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6"
              >
                <Button className="w-full bg-gradient-to-r from-[#9333EA] to-[#7E22CE] hover:from-[#7E22CE] hover:to-[#6B21A8] text-white font-bold py-3 text-lg rounded-2xl shadow-lg hover:shadow-purple-400/40 transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                  <span className="relative z-10">Start Shopping Now</span>
                  <ChevronRight className="relative z-10 w-5 h-5" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </Button>
              </motion.div>

              {/* Tagline */}
              <div className="flex justify-center">
                <motion.p
                  className="flex items-center gap-2 px-5 py-2 text-xs font-medium text-purple-700 rounded-full shadow-sm bg-purple-50"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    scale: [0.98, 1, 0.98],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4" />
                  Winners announced monthly. Don’t miss out!
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LuckyDrawBanner;
