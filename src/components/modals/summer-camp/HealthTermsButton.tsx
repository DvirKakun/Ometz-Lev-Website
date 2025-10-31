import { useHealthTermsButton } from "../../../hooks/useHealthTermsButton";
import { Button } from "../../ui/button";
import { ExternalLink } from "lucide-react";

const HealthTermsButton = () => {
  const { data: healthTermsButton } = useHealthTermsButton();

  if (!healthTermsButton) {
    return null;
  }

  const handleClick = () => {
    const link = healthTermsButton.link;
    if (link && "url" in link && link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="pt-6 mt-4 border-t border-gray-100">
      <Button
        variant="outline"
        size="lg"
        className="w-full bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 hover:from-primary-100 hover:to-primary-200 hover:border-primary-300 text-primary-700 hover:text-primary-800 font-medium rounded-2xl transition-all duration-300 shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 group"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm">{healthTermsButton.title}</span>
          <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        </div>
      </Button>
    </div>
  );
};

export default HealthTermsButton;
