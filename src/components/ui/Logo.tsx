
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', type = 'full' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2 font-bold">
      <div className="relative overflow-hidden">
        <div className={`bg-galien-blue text-white p-2 rounded-md ${sizeClasses[size]}`}>
          <span className="relative z-10">FG</span>
          <div className="absolute inset-0 bg-galien-gold opacity-20"></div>
        </div>
      </div>
      {type === 'full' && (
        <span className={`text-galien-blue ${sizeClasses[size]}`}>
          Forum<span className="text-galien-gold">Galien</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
