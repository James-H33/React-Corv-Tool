import './VinSketch.scss';

interface VinSketchProps {
  vinParts: () => string[];
}

function VinSketch({ vinParts }: VinSketchProps) {
  return (
    <div className="ct-vin-sketch">
      <span className="ct-vin-sketch__top">CHEVROLET</span>
      <div className="ct-vin-sketch__content">
        {vinParts().map((part, index) => (
          <div className="ct-vin-sketch__part" key={index}>
            {part}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VinSketch;
