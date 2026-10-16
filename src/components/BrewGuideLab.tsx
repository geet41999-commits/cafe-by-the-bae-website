import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Flame, Scale, Timer, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

interface BrewStep {
  timeSec: number;
  label: string;
  instruction: string;
  targetWaterGrams: (totalWater: number) => number;
}

interface BrewMethod {
  id: string;
  name: string;
  ratio: number;
  tempCelsius: number;
  grindSize: string;
  totalTimeSec: number;
  steps: BrewStep[];
  baristaTip: string;
}

export const BrewGuideLab: React.FC = () => {
  const brewMethods: BrewMethod[] = [
    {
      id: 'v60',
      name: 'Hario V60 Pour-Over',
      ratio: 16.6,
      tempCelsius: 92,
      grindSize: 'Medium-Fine (Sea Salt)',
      totalTimeSec: 180,
      steps: [
        {
          timeSec: 0,
          label: 'The Bloom',
          instruction: 'Pour water in gentle spirals to saturate coffee grounds evenly. Watch for degassing bubbles.',
          targetWaterGrams: (tw) => Math.round(tw * 0.2),
        },
        {
          timeSec: 45,
          label: 'First Continuous Pour',
          instruction: 'Pour spiraling from the center outward to half total water weight without washing the paper filter edge.',
          targetWaterGrams: (tw) => Math.round(tw * 0.6),
        },
        {
          timeSec: 90,
          label: 'Final Pour',
          instruction: 'Pour remaining water up to target weight with steady, calm stream for uniform slurry level.',
          targetWaterGrams: (tw) => tw,
        },
        {
          timeSec: 150,
          label: 'Drawdown & Swirl',
          instruction: 'Give the dripper one gentle swirl. Allow bed to drain completely flat.',
          targetWaterGrams: (tw) => tw,
        },
      ],
      baristaTip: 'If your brew finishes under 2:30, grind finer. If it exceeds 3:30, coarsen slightly.',
    },
    {
      id: 'flash-iced',
      name: 'Japanese Flash-Chilled Iced Coffee',
      ratio: 15.0,
      tempCelsius: 94,
      grindSize: 'Medium',
      totalTimeSec: 195,
      steps: [
        {
          timeSec: 0,
          label: 'Ice Bed Prep & Bloom',
          instruction: 'Add 40% of total target weight as ice in the glass server. Bloom with 50g hot water.',
          targetWaterGrams: (tw) => Math.round(tw * 0.2),
        },
        {
          timeSec: 45,
          label: 'Center Extraction Pour',
          instruction: 'Pour concentrated hot water directly onto coffee bed, letting hot coffee flash-cool over ice.',
          targetWaterGrams: (tw) => Math.round(tw * 0.5),
        },
        {
          timeSec: 110,
          label: 'Final Hot Pour',
          instruction: 'Complete the hot water pass. Hot concentrate locks in delicate volatiles and florals instantly.',
          targetWaterGrams: (tw) => Math.round(tw * 0.6),
        },
        {
          timeSec: 160,
          label: 'Melt & Serve',
          instruction: 'Swirl the server to melt ice evenly. Pour into a chilled ribbed glass with a straw.',
          targetWaterGrams: (tw) => tw,
        },
      ],
      baristaTip: 'Flash chilling locks in high florals and acidity that cold brew loses in long oxidation.',
    },
    {
      id: 'aeropress',
      name: 'AeroPress (Inverted Method)',
      ratio: 14.0,
      tempCelsius: 88,
      grindSize: 'Medium-Fine',
      totalTimeSec: 120,
      steps: [
        {
          timeSec: 0,
          label: 'Inverted Setup & Fill',
          instruction: 'Invert chamber. Add ground coffee and pour all hot water briskly.',
          targetWaterGrams: (tw) => tw,
        },
        {
          timeSec: 30,
          label: 'Agitation & Cap',
          instruction: 'Stir 5 times back and forth. Attach rinsed paper filter cap tightly.',
          targetWaterGrams: (tw) => tw,
        },
        {
          timeSec: 75,
          label: 'Flip & Gentle Press',
          instruction: 'Carefully invert onto ceramic cup and apply steady arm pressure for 30 seconds.',
          targetWaterGrams: (tw) => tw,
        },
        {
          timeSec: 110,
          label: 'Hiss Stop',
          instruction: 'Stop pressing as soon as the hissing air sound begins to avoid harsh tannins.',
          targetWaterGrams: (tw) => tw,
        },
      ],
      baristaTip: 'Lower brewing temperatures (85-88°C) bring out unparalleled sweetness and round body.',
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState<BrewMethod>(brewMethods[0]);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(18);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const totalWater = Math.round(coffeeGrams * selectedMethod.ratio);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev >= selectedMethod.totalTimeSec) {
            setIsTimerRunning(false);
            return selectedMethod.totalTimeSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, selectedMethod.totalTimeSec]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  // Find active step
  const currentStep = [...selectedMethod.steps]
    .reverse()
    .find((step) => timerSeconds >= step.timeSec) || selectedMethod.steps[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (timerSeconds / selectedMethod.totalTimeSec) * 100);

  return (
    <section id="brew-lab" className="py-16 md:py-24 bg-[#F5EFE4] border-t border-[#E5DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D5338] mb-2">
              <span>Interactive Barista Station</span>
              <span aria-hidden="true">·</span>
              <span>Extraction Science</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#221710] tracking-tight [text-wrap:balance]">
              The Common Room Brew Lab
            </h2>
          </div>
          <p className="text-sm text-[#6C594C] max-w-md leading-relaxed">
            Recreate our counter extraction standards at home with precision ratio calculators and an interactive brew timer.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#EAE2D3] rounded-xl overflow-x-auto scrollbar-none mb-8 max-w-2xl">
          {brewMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMethod(m);
                handleResetTimer();
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedMethod.id === m.id
                  ? 'bg-[#261C14] text-white shadow-xs'
                  : 'text-[#635041] hover:text-[#261C14] hover:bg-white/40'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Main Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator & Parameters */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E4D8C4] p-6 sm:p-8 space-y-6 shadow-2xs">
            <h3 className="font-serif-display text-xl font-semibold text-[#221710]">
              Recipe Ratios & Dose
            </h3>

            {/* Coffee Dose Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-[#645244] uppercase tracking-wider">Coffee Ground Dose</span>
                <span className="font-mono text-base font-bold text-[#8D5338] tabular-nums">
                  {coffeeGrams} grams
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="1"
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full h-2 bg-[#EADEC9] rounded-lg appearance-none cursor-pointer accent-[#8D5338]"
              />
              <div className="flex justify-between text-[10px] text-[#938173] mt-1 font-mono">
                <span>12g (Solo cup)</span>
                <span>20g (Standard)</span>
                <span>40g (Carafe)</span>
              </div>
            </div>

            {/* Calculated Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#FAF7F0] rounded-xl border border-[#EDE2D1] text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-[#8D5338] mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-semibold">Total Water</span>
                </div>
                <span className="font-mono text-lg font-bold text-[#221710] tabular-nums">
                  {totalWater}g
                </span>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-[#8D5338] mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-semibold">Water Temp</span>
                </div>
                <span className="font-mono text-lg font-bold text-[#221710] tabular-nums">
                  {selectedMethod.tempCelsius}°C
                </span>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-[#8D5338] mb-1">
                  <Scale className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-semibold">Ratio</span>
                </div>
                <span className="font-mono text-lg font-bold text-[#221710] tabular-nums">
                  1:{selectedMethod.ratio}
                </span>
              </div>
            </div>

            {/* Grind & Extraction Guidelines */}
            <div className="space-y-3 pt-2 text-xs text-[#5D4A3C]">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E6D5]">
                <span className="font-medium text-[#7D6B5D]">Recommended Grind</span>
                <span className="font-semibold text-[#221710]">{selectedMethod.grindSize}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E6D5]">
                <span className="font-medium text-[#7D6B5D]">Target Total Time</span>
                <span className="font-mono font-semibold text-[#221710]">{formatTime(selectedMethod.totalTimeSec)}</span>
              </div>
              <div className="p-3 bg-[#F4EFE6] rounded-lg text-xs text-[#635041] leading-relaxed">
                <span className="font-semibold text-[#8D5338] block mb-0.5">Head Barista Tip:</span>
                {selectedMethod.baristaTip}
              </div>
            </div>
          </div>

          {/* Right Column: Live Brew Timer & Step Guidance */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4D8C4] p-6 sm:p-8 space-y-6 shadow-2xs">
            {/* Timer Display */}
            <div className="text-center py-6 bg-[#FAF7F0] rounded-xl border border-[#EDE2D1] relative overflow-hidden">
              <div
                className="absolute left-0 bottom-0 top-0 bg-[#E8DFC9]/40 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />

              <div className="relative z-10 space-y-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8D5338]">
                  Brew Clock
                </span>
                <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-[#221710] tabular-nums">
                  {formatTime(timerSeconds)}
                </div>
                <div className="text-xs text-[#7A6759] font-mono">
                  Target: {formatTime(selectedMethod.totalTimeSec)} · Current Target Water:{' '}
                  <span className="font-bold text-[#261C14]">
                    {currentStep.targetWaterGrams(totalWater)}g
                  </span>
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isTimerRunning ? (
                <button
                  onClick={() => setIsTimerRunning(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{timerSeconds === 0 ? 'Start Brew Timer' : 'Resume'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#8D5338] hover:bg-[#72412B] rounded-lg transition-colors shadow-xs"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Timer</span>
                </button>
              )}

              <button
                onClick={handleResetTimer}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium text-[#685548] hover:text-[#221710] bg-[#F1ECE1] hover:bg-[#E5DDCB] rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Step-by-Step Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#735F50]">
                Step Sequence
              </h4>
              <div className="space-y-2">
                {selectedMethod.steps.map((step, idx) => {
                  const isActive = currentStep.label === step.label;
                  const isDone = timerSeconds > step.timeSec && !isActive;

                  return (
                    <div
                      key={step.label}
                      className={`p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                        isActive
                          ? 'border-[#8D5338] bg-[#F9F4EB] text-[#221710] shadow-xs'
                          : isDone
                          ? 'border-[#EAE2D3] bg-[#FCFBF8] text-[#8C7A6D]'
                          : 'border-[#F0E6D5] bg-white text-[#5E4D40]'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#3A754E]" />
                        ) : (
                          <span
                            className={`font-mono font-bold text-[11px] px-1.5 py-0.5 rounded ${
                              isActive ? 'bg-[#8D5338] text-white' : 'bg-[#EAE2D3] text-[#554336]'
                            }`}
                          >
                            {formatTime(step.timeSec)}
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{step.label}</span>
                          <span className="font-mono text-[11px] text-[#8D5338] font-bold">
                            Pour to {step.targetWaterGrams(totalWater)}g
                          </span>
                        </div>
                        <p className="leading-relaxed text-[#604E40]">{step.instruction}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
