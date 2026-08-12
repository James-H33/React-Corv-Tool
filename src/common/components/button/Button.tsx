import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'medium' | 'compact' | 'small' | 'xsmall';
  variant?: 'outline' | 'primary' | 'ghost';
  hasIcon?: boolean;
}

function Button({
  children,
  size = 'medium',
  variant = 'outline',
  hasIcon = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={ hasIcon ? 'ct-button-icon' : 'ct-button' }
      data-ctbuttonsize={size}
      data-ctbuttonvariant={variant}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
