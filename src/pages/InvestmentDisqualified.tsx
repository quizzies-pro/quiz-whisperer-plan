import { useEffect, useState } from "react";
import { XCircle, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/locagoraoficial";

const InvestmentDisqualified = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar over 3 seconds
    const start = Date.now();
    const duration = 3000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        window.location.href = INSTAGRAM_URL;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
        </div>

        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
          Infelizmente, dessa vez não vai ser possível 😔
        </h1>

        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
          Agradecemos muito pelo seu interesse, mas o investimento mínimo necessário para uma Franquia LocaGora está acima da sua disponibilidade atual.
        </p>

        <p className="text-muted-foreground/80 font-body text-xs md:text-sm leading-relaxed">
          Quem sabe em uma próxima oportunidade! Enquanto isso, acompanhe nosso conteúdo para ficar por dentro das novidades.
        </p>

        <div className="pt-4 space-y-4">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-body text-sm hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Clique aqui se não foi redirecionado
          </a>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDisqualified;
