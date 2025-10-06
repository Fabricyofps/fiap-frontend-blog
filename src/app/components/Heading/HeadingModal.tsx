"use client";

interface HeadingModalProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const HeadingModal: React.FC<HeadingModalProps> = ({
  title,
  subtitle,
  center,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-xl font-semibold text-neutral-700">{title}</div>
      <div className="font-light text-neutral-600 mt-2">{subtitle}</div>
    </div>
  );
};

export default HeadingModal;
