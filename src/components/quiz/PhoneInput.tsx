import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const countryCodes: CountryCode[] = [
  { code: "BR", dial: "+55", flag: "🇧🇷", name: "Brasil" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "Estados Unidos" },
  { code: "PT", dial: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "AR", dial: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", dial: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CO", dial: "+57", flag: "🇨🇴", name: "Colômbia" },
  { code: "MX", dial: "+52", flag: "🇲🇽", name: "México" },
  { code: "PY", dial: "+595", flag: "🇵🇾", name: "Paraguai" },
  { code: "UY", dial: "+598", flag: "🇺🇾", name: "Uruguai" },
  { code: "PE", dial: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "EC", dial: "+593", flag: "🇪🇨", name: "Equador" },
  { code: "BO", dial: "+591", flag: "🇧🇴", name: "Bolívia" },
  { code: "VE", dial: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "Espanha" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "França" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Alemanha" },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Itália" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "Reino Unido" },
  { code: "JP", dial: "+81", flag: "🇯🇵", name: "Japão" },
  { code: "CN", dial: "+86", flag: "🇨🇳", name: "China" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "Índia" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "Emirados Árabes" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canadá" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Austrália" },
];

const formatPhone = (value: string, countryCode: string): string => {
  const digits = value.replace(/\D/g, "");
  if (countryCode === "BR") {
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
  // Generic formatting for other countries
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
};

interface PhoneInputProps {
  value: string;
  onChange: (fullValue: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const PhoneInput = ({ value, onChange, onSubmit, placeholder }: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneDigits, setPhoneDigits] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const maxLen = selectedCountry.code === "BR" ? 11 : 15;
    const trimmed = digits.slice(0, maxLen);
    setPhoneDigits(trimmed);
    const formatted = formatPhone(trimmed, selectedCountry.code);
    onChange(`${selectedCountry.dial} ${formatted}`);
  };

  const isValid = () => {
    const digits = phoneDigits.replace(/\D/g, "");
    if (selectedCountry.code === "BR") return digits.length >= 10 && digits.length <= 11;
    return digits.length >= 7;
  };

  return (
    <div className="flex gap-2 items-stretch">
      {/* Country selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 px-3 rounded-[10px] bg-card card-border text-foreground flex items-center gap-1.5 hover:border-primary/40 transition-all min-w-[90px]"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm font-body text-muted-foreground">{selectedCountry.dial}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-64 max-h-60 overflow-y-auto rounded-[10px] bg-card card-border border border-border/50 z-50 shadow-xl scrollbar-none">
            {countryCodes.map((c) => (
              <button
                key={c.code + c.dial}
                onClick={() => {
                  setSelectedCountry(c);
                  setIsOpen(false);
                  handlePhoneChange(phoneDigits);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-primary/10 transition-colors text-sm font-body",
                  selectedCountry.code === c.code && "bg-primary/5 text-primary"
                )}
              >
                <span className="text-lg">{c.flag}</span>
                <span className="text-foreground">{c.name}</span>
                <span className="text-muted-foreground ml-auto">{c.dial}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone input */}
      <input
        type="tel"
        value={formatPhone(phoneDigits, selectedCountry.code)}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder={placeholder || "(00) 00000-0000"}
        className="flex-1 h-14 px-5 rounded-[10px] bg-card card-border text-foreground text-base font-body placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
        onKeyDown={(e) => {
          if (e.key === "Enter" && isValid()) onSubmit();
        }}
      />
    </div>
  );
};

export { PhoneInput, type PhoneInputProps };
export default PhoneInput;
