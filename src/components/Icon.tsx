interface IconProps {
  iconImg: string;
  alt: string;
  className?: string;
}

const Icon = ({ iconImg, alt, className }: IconProps) => {
  return (
    <a className={`block ${className}`}>
      <img className="rounded-lg" src={iconImg} alt={alt} />
    </a>
  );
};

export default Icon;
