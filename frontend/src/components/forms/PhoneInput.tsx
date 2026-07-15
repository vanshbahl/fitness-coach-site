import { useState, useMemo, useEffect, useRef } from "react";
import { getCountries, getCountryCallingCode, CountryCode } from "libphonenumber-js/max";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhoneInputProps {
  countryValue: string;
  countryCodeValue: string;
  nationalNumberValue: string;
  onCountryChange: (val: string) => void;
  onCountryCodeChange: (val: string) => void;
  onNationalNumberChange: (val: string) => void;
  error?: string;
}

export function getFlagEmoji(countryCode: string) {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function PhoneInput({
  countryValue,
  countryCodeValue,
  nationalNumberValue,
  onCountryChange,
  onCountryCodeChange,
  onNationalNumberChange,
  error
}: PhoneInputProps) {
  const [isCodeOverridden, setIsCodeOverridden] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isDialCodeOpen, setIsDialCodeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dialCodeRef = useRef<HTMLDivElement>(null);
  const [hasAutoDetected, setHasAutoDetected] = useState(false);

  // Build country list
  const countries = useMemo(() => {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return getCountries().map((code) => {
      let name: string = code;
      try {
        name = regionNames.of(code) || code;
      } catch {
        // fallback to code
      }
      return {
        code,
        name,
        dialCode: `+${getCountryCallingCode(code)}`,
        flag: getFlagEmoji(code)
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Auto-detect location on first load
  useEffect(() => {
    if (hasAutoDetected) return;
    
    // Only attempt if the values are still at their defaults
    if (countryValue === "IN" && countryCodeValue === "+91" && !nationalNumberValue) {
      try {
        // Use browser locale (e.g. en-US -> US, en-GB -> GB)
        const locale = navigator.language;
        const region = locale.split('-')[1]?.toUpperCase();
        
        if (region) {
          const detectedCountry = countries.find(c => c.code === region);
          if (detectedCountry) {
            onCountryChange(detectedCountry.code);
            onCountryCodeChange(detectedCountry.dialCode);
          }
        }
      } catch (e) {
        // Fallback silently to defaults
      }
    }
    setHasAutoDetected(true);
  }, [hasAutoDetected, countryValue, countryCodeValue, nationalNumberValue, countries, onCountryChange, onCountryCodeChange]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (dialCodeRef.current && !dialCodeRef.current.contains(event.target as Node)) {
        setIsDialCodeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCountryOpen(false);
        setIsDialCodeOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCountrySelect = (countryCode: string) => {
    onCountryChange(countryCode);
    if (!isCodeOverridden) {
      const dialCode = `+${getCountryCallingCode(countryCode as CountryCode)}`;
      onCountryCodeChange(dialCode);
    }
    setIsCountryOpen(false);
    setSearchQuery("");
  };

  const handleCountryCodeSelect = (code: string) => {
    onCountryCodeChange(code);
    setIsCodeOverridden(true);
    setIsDialCodeOpen(false);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    onNationalNumberChange(digitsOnly);
  };

  // Unique list of dial codes with their primary flag for the override selector
  const uniqueDialCodes = useMemo(() => {
    const seen = new Set<string>();
    const codes: { code: string; flag: string }[] = [];
    
    countries.forEach((c) => {
      if (!seen.has(c.dialCode)) {
        seen.add(c.dialCode);
        codes.push({ code: c.dialCode, flag: c.flag });
      }
    });
    
    return codes.sort((a, b) => parseInt(a.code.substring(1)) - parseInt(b.code.substring(1)));
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.dialCode.includes(searchQuery)
    );
  }, [countries, searchQuery]);

  const selectedCountryObj = countries.find(c => c.code === countryValue) || countries[0];
  const selectedDialCodeObj = uniqueDialCodes.find(c => c.code === countryCodeValue) || uniqueDialCodes[0];

  // Validation Helper Text Context
  let helperText = "Enter your local WhatsApp number.";
  if (countryValue === "IN") helperText = "Indian numbers contain 10 digits.";
  else if (["US", "CA"].includes(countryValue)) helperText = "Enter your WhatsApp number without the country code.";

  return (
    <div className="space-y-3 relative z-10">
      {/* Country Selector */}
      <div className="relative" ref={dropdownRef}>
        <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 pl-1 block mb-2">Country / Region *</label>
        <button
          type="button"
          onClick={() => setIsCountryOpen(!isCountryOpen)}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white hover:bg-white/10 focus:outline-none focus:border-white/30 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{selectedCountryObj.flag}</span>
            <span className="font-medium text-[15px]">{selectedCountryObj.name}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isCountryOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isCountryOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2 border-b border-white/5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-transparent rounded-lg h-10 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
                />
              </div>
              <div className="max-h-[280px] overflow-y-auto p-1 custom-scrollbar">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleCountrySelect(c.code)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${c.code === countryValue ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{c.flag}</span>
                        <span className="text-[14px] font-medium">{c.name}</span>
                      </div>
                      <span className={`text-[12px] ${c.code === countryValue ? 'text-orange-400/80' : 'text-zinc-500'}`}>
                        {c.dialCode}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-zinc-500">No countries found</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 pl-1 block mb-2">WhatsApp Number *</label>
        <div className="flex gap-2 relative">
          
          {/* Dial Code Selector */}
          <div className="relative shrink-0 w-[110px]" ref={dialCodeRef}>
            <button
              type="button"
              onClick={() => setIsDialCodeOpen(!isDialCodeOpen)}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-3 flex items-center justify-between text-white hover:bg-white/10 focus:outline-none focus:border-white/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-base shrink-0">{selectedDialCodeObj?.flag}</span>
                <span className="font-medium text-[14px] truncate">{countryCodeValue}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </button>

            <AnimatePresence>
              {isDialCodeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-[calc(100%+8px)] left-0 w-[160px] bg-[#111] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="max-h-[240px] overflow-y-auto p-1 custom-scrollbar">
                    {uniqueDialCodes.map((codeObj) => (
                      <button
                        key={codeObj.code}
                        type="button"
                        onClick={() => handleCountryCodeSelect(codeObj.code)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${codeObj.code === countryCodeValue ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span className="text-base">{codeObj.flag}</span>
                        <span className="text-[14px] font-medium">{codeObj.code}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* National Number Input */}
          <input
            type="tel"
            value={nationalNumberValue}
            onChange={handleNumberChange}
            placeholder="98765 43210"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
          />
        </div>
        
        <div className="pl-1 mt-1.5 h-5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-red-400 text-xs block absolute"
              >
                {error}
              </motion.span>
            ) : (
              <motion.div
                key="helper"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center gap-2 absolute"
              >
                <span className="text-zinc-500 text-[11px] font-medium tracking-wide">
                  {helperText}
                </span>
                {isCodeOverridden && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">Custom Dial Code</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
