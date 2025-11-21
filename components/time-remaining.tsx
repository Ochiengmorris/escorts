"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const CountdownTimer = ({ from, target }: { from: string; target: string }) => {
  const targetDate = new Date(target);
  const startDate = new Date(from);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <Card className="bg-black p-8 rounded-lg shadow-2xl w-full">
      <div className="text-center">
        <h2 className="text-primary text-sm font-semibold tracking-wider uppercase">
          EXPIRY DATE & TIME: 2025-12-31 00:00:00
        </h2>
      </div>

      <div className="flex gap-5 justify-center items-center">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
            {formatNumber(timeLeft.days)}
          </div>
          <div className="text-gray-400 text-sm font-semibold tracking-widest">
            DAYS
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
            {formatNumber(timeLeft.hours)}
          </div>
          <div className="text-gray-400 text-sm font-semibold tracking-widest">
            HRS
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="text-gray-400 text-sm font-semibold tracking-widest">
            MIN
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-gray-600 mb-2 font-mono">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="text-gray-500 text-sm font-semibold tracking-widest">
            SEC
          </div>
        </div>
      </div>

      <div className="">
        <div className="h-1 bg-linear-to-r from-black via-primary to-black rounded-full"></div>
      </div>
    </Card>
  );
};

export default CountdownTimer;
