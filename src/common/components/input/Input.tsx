import './Input.scss';

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ct-input" {...props} />;
}

export default Input;
