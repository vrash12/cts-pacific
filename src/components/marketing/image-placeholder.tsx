import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  label: string;
  description: string;
};

export function ImagePlaceholder({
  label,
  description,
}: ImagePlaceholderProps) {
  return (
    <div className="image-placeholder" role="img" aria-label={`${label}. ${description}`}>
      <div className="image-placeholder__grid" aria-hidden="true" />
      <div className="image-placeholder__content">
        <ImageIcon aria-hidden="true" size={28} strokeWidth={1.5} />
        <p className="image-placeholder__label">{label}</p>
        <p className="image-placeholder__description">{description}</p>
      </div>
    </div>
  );
}

