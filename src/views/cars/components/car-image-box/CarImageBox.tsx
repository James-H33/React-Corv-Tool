import type { Car } from '@common/types/car.interface';
import { decodeVin } from '@common/utils/decode/vin/decode.function';
import { useCallback, useMemo } from 'react';
import TagSketch from '../tag-sketch/TagSketch';
import VinSketch from '../vin-sketch/VinSketch';
import './CarImageBox.scss';

function getVinParts(vin: string, year: string): string[] {
  const {
    make,
    series,
    bodyStyle,
    modelYear,
    assemblyPlant,
    productionSequence,
  } = decodeVin(vin, year);

  return [
    make.value,
    series.value,
    bodyStyle.value,
    modelYear.value,
    assemblyPlant.value,
    productionSequence.value,
  ];
}

interface CarImageBoxProps {
  car: Car | null | undefined;
  type: 'vin' | 'tag';
  isUsingSketchView: boolean;
  isLoading: boolean;
  extractedData: { imageId: string } | null | undefined;
  upload: () => void;
}

function CarImageBox({
  car,
  type,
  isUsingSketchView,
  isLoading,
  extractedData,
  upload,
}: CarImageBoxProps) {
  const imageBaseUrl = 'http://localhost:3000/static-images/';

  const imageUrlBasedOnType = useMemo(() => {
    if (!car) {
      return '';
    }

    return type === 'vin' ? car.vinImageUrl || '' : car.tagImageUrl || '';
  }, [car, type]);

  const imageUrl = useMemo(() => {
    const baseUrl = imageBaseUrl;
    const extractedImageUrl = extractedData?.imageId;

    if (!car) {
      return null;
    }

    const url = extractedImageUrl ? extractedImageUrl : imageUrlBasedOnType;

    return url ? `${baseUrl}${url}` : null;
  }, [imageUrlBasedOnType, extractedData]);

  const onUpload = useCallback(() => {
    upload();
  }, [upload]);

  if (isLoading) {
    return (
      <div className="ct-car-item__no-image">
        <span className="ct-car-item__extracting-text shimmer-text">
          Processing Image...
        </span>
      </div>
    );
  }

  if (imageUrl && isUsingSketchView) {
    return (
      <div className="ct-car-item__sketch">
        {type === 'vin' ? (
          <VinSketch
            vinParts={() => getVinParts(car?.vin || '', car?.year || '')}
          />
        ) : (
          <TagSketch car={car} />
        )}
      </div>
    );
  }

  if (imageUrl && !isUsingSketchView) {
    return (
      <div
        className="ct-car-item__image-container"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    );
  }

  return (
    <>
      <div
        className="ct-car-item__no-image"
        onClick={onUpload}
        role="button"
        tabIndex={0}
      >
        <label
          htmlFor="type === 'vin' ? 'vinPicture' : 'tagPicture'"
          className="ct-car-options-menu__upload-label"
        >
          Click here to add {type === 'vin' ? 'Vin' : 'Tag'} Image
        </label>
      </div>
    </>
  );
}

export default CarImageBox;
