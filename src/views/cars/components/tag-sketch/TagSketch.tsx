import type { Car } from '@common/types/car.interface';
import { trimTagDecoder } from '@common/utils/decode/trim-tag/decode.function';
import { useMemo } from 'react';
import './TagSketch.scss';

interface TagSketchProps {
  car: Car | null | undefined;
}

function TagSketch({ car }: TagSketchProps) {
  const trimTagData = useMemo(() => {
    if (!car) {
      return null;
    }

    return trimTagDecoder(car.tagData, car.year);
  }, [car]);

  return (
    <div className="ct-trim-tag-sketch">
      <div className="ct-trim-tag-sketch__box">
        <div className="ct-trim-tag-sketch__item ct-trim-tag-sketch__item--date">
          <span className="ct-trim-tag-sketch__item-label">DATE:</span>
          <span className="ct-trim-tag-sketch__item-value">
            {trimTagData?.['dateCode']?.value}
          </span>
        </div>

        <div className="ct-trim-tag-sketch__item ct-trim-tag-sketch__item--style">
          <span className="ct-trim-tag-sketch__item-label">STYLE:</span>
          <span className="ct-trim-tag-sketch__item-value">
            {trimTagData?.['style']?.value}
          </span>
        </div>

        <div className="ct-trim-tag-sketch__item ct-trim-tag-sketch__item--trim">
          <span className="ct-trim-tag-sketch__item-label">TRIM:</span>
          <span className="ct-trim-tag-sketch__item-value">
            {trimTagData?.['trim']?.value}
          </span>
        </div>

        <div className="ct-trim-tag-sketch__item ct-trim-tag-sketch__item--paint">
          <span className="ct-trim-tag-sketch__item-label">PAINT:</span>
          <span className="ct-trim-tag-sketch__item-value">
            {trimTagData?.['paint']?.value}
          </span>
        </div>

        <div className="ct-trim-tag-sketch__item ct-trim-tag-sketch__item--body">
          <span className="ct-trim-tag-sketch__item-label">BODY:</span>
          <span className="ct-trim-tag-sketch__item-value">
            {trimTagData?.['body']?.value}
          </span>
        </div>
      </div>

      <span className="ct-trim-tag-sketch__top">
        CHEVROLET DIV. GENERAL MOTORS CORP.
      </span>
      <span className="ct-trim-tag-sketch__bottom">BODY BY CHEVROLET</span>
    </div>
  );
}

export default TagSketch;
