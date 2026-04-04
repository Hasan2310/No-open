import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [lyricIndex, setLyricIndex] = useState(-1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false); // Untuk Loading Screen
  const audioRef = useRef(null);

  const myWhatsApp = "6285215128586";

  // Fungsi untuk ngecek apakah musik sudah terload
  const handleCanPlayThrough = () => {
    setIsReady(true);
  };

  const startExperience = () => {
    setStep(2);
    setIsMusicPlaying(true);
    if (audioRef.current) audioRef.current.play();
  };

  const handleResponse = (answer) => {
    const text = answer === 'yes'
      ? "Iya, aku mau jadi pacar kamu!"
      : "Maaf ya, aku belum bisa... tapi makasih ya udah jujur.";
    window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    if (step === 2) {
      const timers = [
        setTimeout(() => setLyricIndex(0), 1800),
        setTimeout(() => setLyricIndex(1), 5500),
        setTimeout(() => setLyricIndex(2), 9000),
        setTimeout(() => setLyricIndex(3), 14000),
        setTimeout(() => setLyricIndex(4), 18200),
        setTimeout(() => setLyricIndex(5), 23000),
        setTimeout(() => setLyricIndex(6), 28600),
        setTimeout(() => setLyricIndex(7), 34200),
        setTimeout(() => setStep(3), 44000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [step]);

  const lyrics = [
    { text: "Ku telah menyadari...", size: "text-3xl md:text-5xl" },
    { text: "Dirinyalah yang pantas miliki", size: "text-3xl md:text-5xl" },
    { text: "Bunga abadi yang t'lah kusimpan", size: "text-3xl md:text-5xl font-serif italic" },
    { text: "Set'lah sekian lama...", size: "text-2xl md:text-4xl" },
    { text: "Terpendam jauh dalam diriku", size: "text-3xl md:text-5xl" },
    { text: "Di dalam hidupku... Oh", size: "text-4xl md:text-6xl font-bold" },
    { text: "Apalah arti dari semua yang tercipta", size: "text-2xl md:text-4xl italic" },
    { text: "Tanpa kehadirannya di sini", size: "text-4xl md:text-7xl font-bold text-[#7a8d6e]" },
  ];

  return (
    <div className="relative w-full h-[100dvh] bg-[#fcfbf4] overflow-hidden font-sans selection:bg-[#b5838d]/20">

      {/* 1. LOADING SCREEN */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#fcfbf4] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="text-4xl mb-4"
            >
              🌸
            </motion.div>
            <p className="text-[#7a8d6e] text-xs tracking-[0.3em] font-bold animate-pulse">
              TUNGGU SEBENTAR...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        onCanPlayThrough={handleCanPlayThrough} // Triggers when audio is ready
        onEnded={() => setIsMusicPlaying(false)}
      >
        <source src="./Rio Clappy - Bunga Abadi.mp3" type="audio/mpeg" />
      </audio>

      <section className="relative flex items-center justify-center w-full h-full px-8 text-[#4a5d4d]">
        <AnimatePresence mode="wait">

          {/* STEP 1: LOGO SURAT */}
          {step === 1 && isReady && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              className="text-center"
            >
              <motion.div
                className="text-7xl md:text-8xl mb-12 cursor-pointer inline-block"
                whileHover={{ scale: 1.1, rotate: 5 }}
                onClick={startExperience}
              >
                <span role="img" aria-label="letter">📩</span>
              </motion.div>
              <br />
              <motion.button
                whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
                whileTap={{ scale: 0.95 }}
                onClick={startExperience}
                className="px-8 py-3 border-b-2 border-[#7a8d6e] text-[#7a8d6e] text-xs tracking-[0.3em] font-bold uppercase transition-all"
              >
                Buka Pesan
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2: LIRIK */}
          {step === 2 && (
            <motion.div
              key="lyrics"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
              className="w-full text-center max-w-4xl"
            >
              <AnimatePresence mode="wait">
                {lyricIndex >= 0 && (
                  <motion.div
                    key={`lyric-${lyricIndex}`}
                    initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, filter: "blur(15px)" }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className={`font-serif leading-snug text-[#4a5d4d] tracking-tight ${lyrics[lyricIndex].size}`}>
                      {lyrics[lyricIndex].text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 3: FINAL CONFESSION */}
          {step === 3 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="mb-10 text-6xl"
              >
                <span className="opacity-80">💐</span>
              </motion.div>

              <div className="space-y-8 text-[#4a5d4d] mb-16 text-center max-w-2xl mx-auto px-4">
                {/* Header Section */}
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.3em] uppercase opacity-50 font-medium">
                    Pesan dari Hasan
                  </p>
                  <div className="h-[1px] w-16 bg-[#7a8d6e]/40 mx-auto"></div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed font-light italic opacity-90">
                    "Cilla, maaf ya udah buat kamu nunggu. <br className="hidden md:block" />
                    Aku juga minta maaf soal yang kemarin, kita perbaikin bareng ya? <br className="hidden md:block" />
                    Aku janji nggak gitu lagi."
                  </p>

                  <p className="text-base leading-relaxed">
                    Terus buat sekarang, aku nggak pengen kamu bingung lagi soal status kita.
                  </p>
                </div>

                {/* Highlight Quote */}
                <div className="py-4">
                  <h2 className="text-xl md:text-3xl font-serif italic text-[#5a6b50] tracking-wide">
                    "Aku pengen status kita lebih dari sekadar teman."
                  </h2>
                </div>

                {/* Final Question */}
                <div className="mt-12 pt-8 border-t border-[#7a8d6e]/10">
                  <h1 className="text-3xl md:text-5xl font-serif text-[#b5838d] leading-tight drop-shadow-sm">
                    Jadi Cilla, kamu mau gak <br />
                    <span className="italic">jadi pacarku?</span>
                  </h1>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#6b7c5f" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleResponse('yes')}
                  className="px-12 py-4 bg-[#7a8d6e] text-white rounded-full font-bold shadow-[0_10px_20px_rgba(122,141,110,0.3)] transition-all"
                >
                  Ya, Aku Mau ✨
                </motion.button>
                <motion.button
                  whileHover={{ opacity: 1 }}
                  onClick={() => handleResponse('no')}
                  className="text-[#7a8d6e] text-sm font-medium opacity-40 hover:underline transition-all"
                >
                  Maaf, belum bisa...
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      {/* MINI PLAYER */}
      <AnimatePresence>
        {isMusicPlaying && (
          <motion.div
            initial={{ y: 120, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 120, x: "-50%", opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-50 bg-white/90 backdrop-blur-xl p-3 pr-8 rounded-2xl border border-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[260px]"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-md bg-[#e5e7eb] flex items-center justify-center group">
              <img
                src="mf.png"
                alt="Album Art"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=🌸"; }}
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="flex flex-col overflow-hidden">
              <span className="text-[9px] font-black text-[#b5838d] uppercase tracking-[0.2em] mb-0.5">Now Playing</span>
              <p className="text-xs font-bold text-[#4a5d4d] truncate">Bunga Abadi</p>
              <p className="text-[10px] text-[#7a8d6e] opacity-70">Rio Clappy</p>
            </div>

            <div className="flex gap-[3px] items-end h-3 ml-auto">
              {[0.6, 1, 0.4, 0.8].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{ repeat: Infinity, duration: h + 0.4, delay: i * 0.1 }}
                  className="w-1 bg-[#b5838d] rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;