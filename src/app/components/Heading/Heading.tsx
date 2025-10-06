"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-4xl font-bold text-neutral-700">{title}</div>

      <div className="font-light text-neutral-500 mt-8">{subtitle}</div>
    </div>
  );
};

export default Heading;
