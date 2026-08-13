import Button from '@common/components/button/Button';
import Icon from '@common/components/icon/Icon';
import TextField from '@common/components/text-field/TextField';
import type { Car as CarModelType } from '@common/types/car.interface';
import { FormTypes } from '@common/types/form-types.enum';
import { IconTypes } from '@common/types/icon';
import { trimTagDecoder } from '@common/utils/decode/trim-tag/decode.function';
import { decodeVin } from '@common/utils/decode/vin/decode.function';
import * as CarActions from '@store/car/car.actions';
import {
  selectActiveForm,
  selectCarById,
  selectExtractedData,
  selectExtractedDataByType,
  selectExtractingDataFor,
} from '@store/car/car.selectors';
import type { AppDispatch, RootState } from '@store/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CarImageBox from '../components/car-image-box/CarImageBox';
import './Car.scss';

const emptyCarSelector = (_: RootState) => undefined;

function Car() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const activeForm = useSelector(selectActiveForm);
  const carSelector = useMemo(
    () => (id ? selectCarById(id) : emptyCarSelector),
    [id]
  );

  const car = useSelector(carSelector);

  const [carModel, setCarModel] = useState<CarModelType | null>(car ?? null);
  const [isUsingVinSketchView, setIsUsingVinSketchView] = useState(false);
  const [isUsingTagSketchView, setIsUsingTagSketchView] = useState(false);
  const extractedVinDataFromStore = useSelector(
    selectExtractedDataByType('vin')
  );
  const extractedTagDataFromStore = useSelector(
    selectExtractedDataByType('tag')
  );
  const extractingDataFor = useSelector(selectExtractingDataFor);

  const isExtractingDataForTag = extractingDataFor === FormTypes.TrimTag;
  const isExtractingDataForVin = extractingDataFor === FormTypes.Vin;

  const hasVinImage = useMemo(() => {
    return !!car?.vinImageUrl;
  }, [car]);

  const vinDisplayFields = [
    { label: 'Make', value: 'make' },
    { label: 'Series', value: 'series' },
    { label: 'Body Style', value: 'bodyStyle' },
    { label: 'Model Year', value: 'modelYear' },
    { label: 'Assembly Plant', value: 'assemblyPlant' },
    { label: 'Production Sequence', value: 'productionSequence' },
  ];

  const trimTagDisplayFields = [
    { label: 'Style', value: 'style' },
    { label: 'Trim', value: 'trim' },
    { label: 'Body', value: 'body' },
    { label: 'Paint', value: 'paint' },
    { label: 'Date', value: 'dateCode' },
  ];

  const decodedTagData = useMemo(() => {
    if (!car || !car.tagData || !car.year) {
      return null;
    }

    return trimTagDecoder(car.tagData, car.year);
  }, [car]);

  const decodedVinData = useMemo(() => {
    if (!car) {
      return null;
    }

    return car.vin ? decodeVin(car.vin, car.year) : null;
  }, [car]);

  const editName = useCallback(() => {
    dispatch(CarActions.setActiveForm({ formType: FormTypes.Name }));
  }, [dispatch]);

  const cancelEditName = useCallback(() => {
    dispatch(CarActions.setActiveForm({ formType: null }));
  }, [dispatch]);

  const useSketchView = useCallback((type: 'vin' | 'tag') => {
    if (type === 'vin') {
      setIsUsingVinSketchView(true);
    } else if (type === 'tag') {
      setIsUsingTagSketchView(true);
    }
  }, []);

  const useActualView = useCallback((type: 'vin' | 'tag') => {
    if (type === 'vin') {
      setIsUsingVinSketchView(false);
    } else if (type === 'tag') {
      setIsUsingTagSketchView(false);
    }
  }, []);

  const saveName = useCallback(
    (newName: string) => {
      if (car) {
        dispatch(
          CarActions.updateCar({
            id: car.id,
            data: { name: newName },
          })
        );
      }
    },
    [dispatch, car]
  );

  const saveVinEdits = useCallback(() => {
    if (carModel && car) {
      dispatch(
        CarActions.updateCar({
          id: car.id,
          data: { vin: carModel.vin },
        })
      );
    }
  }, [dispatch, carModel, car]);

  const cancelVinEdits = useCallback(() => {
    if (car) {
      setCarModel(car);
    }
  }, [car]);

  useEffect(() => {
    if (id && !car) {
      dispatch(CarActions.loadCarById({ id }));
    }
  }, [dispatch, id, car]);

  useEffect(() => {
    setCarModel(car ?? null);
  }, [car]);

  return (
    <div className="ct-car">
      <div className="ct-car-nav">
        <Button variant={'outline'} hasIcon={true}>
          <Link to="/v/cars" className="ct-car-nav__link">
            <Icon icon={IconTypes.BackArrow} size={16} />
          </Link>
        </Button>
      </div>

      <header className="ct-car-header">
        {activeForm === FormTypes.Name ? (
          <div className="ct-car-header__name-form">
            <TextField
              className="ct-car-header__name-input"
              type="text"
              placeholder="Car Name"
              value={carModel?.name ?? ''}
              onChange={(e) =>
                setCarModel((currentCarModel) =>
                  currentCarModel
                    ? { ...currentCarModel, name: e.target.value }
                    : currentCarModel
                )
              }
            />

            <div className="ct-car-name-edit-actions">
              <Button
                variant="primary"
                onClick={() => saveName(carModel?.name ?? '')}
              >
                Save
              </Button>
              <Button variant="outline" onClick={cancelEditName}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="ct-car-header__title"
            onClick={editName}
            role="button"
            tabIndex={0}
          >
            {car?.name}
          </div>
        )}
      </header>

      <div className="ct-car-body">
        <div className="ct-car-item">
          <CarImageBox
            car={car}
            type="vin"
            isUsingSketchView={isUsingVinSketchView}
            isLoading={isExtractingDataForVin}
            extractedData={extractedVinDataFromStore}
          />

          <div className="ct-car-item__action">
            {hasVinImage && (
              <div className="ct-car-item__action-left">
                <Button
                  variant={isUsingVinSketchView ? 'outline' : 'primary'}
                  onClick={() => useActualView('vin')}
                >
                  Actual
                </Button>
                <Button
                  variant={isUsingVinSketchView ? 'primary' : 'outline'}
                  onClick={() => useSketchView('vin')}
                >
                  Sketch
                </Button>
              </div>
            )}

            <div className="ct-car-item__action-right">
              {car?.vin && (
                <Button variant={'outline'} hasIcon={true}>
                  <Icon icon={IconTypes.EllipsesMenu} size={14}></Icon>
                </Button>
              )}
            </div>
          </div>

          {activeForm === 'vin' ? (
            <div className="ct-car-item__vin ct-car-item__detail">
              <span className="ct-car-item__detail-label">Vin:</span>
              <TextField type="text" value={carModel?.vin ?? ''} />
            </div>
          ) : (
            <div className="ct-car-item__vin">VIN: {car?.vin}</div>
          )}

          {activeForm === 'vin' && (
            <>
              {/* <div className="ct-car-item__error">*{ error.message }</div> */}

              <div className="ct-car-item__verify">
                *Verify input before submitting.
              </div>

              <div className="ct-car-item__edit-actions">
                <Button
                  variant="primary"
                  onClick={saveVinEdits}
                  disabled={!carModel?.vin || carModel.vin.length === 0}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={cancelVinEdits}>
                  Cancel
                </Button>
              </div>
            </>
          )}

          {decodedVinData ? (
            <div className="ct-car-item__details">
              {vinDisplayFields.map((field) => (
                <div className="ct-car-item__detail">
                  <span className="ct-car-item__detail-label">
                    {field.label}: {decodedVinData?.[field.value]?.value}
                  </span>

                  <span className="ct-car-item__detail-value">
                    {decodedVinData?.[field.value]?.description}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="ct-car-item__details">
              No VIN Data Available Yet.
            </div>
          )}
        </div>

        <div className="ct-car-item">
          <CarImageBox
            car={car}
            type="tag"
            isUsingSketchView={isUsingTagSketchView}
            isLoading={isExtractingDataForTag}
            extractedData={extractedTagDataFromStore}
          />

          <div className="ct-car-item__action">
            {hasVinImage && (
              <div className="ct-car-item__action-left">
                <Button
                  variant={isUsingTagSketchView ? 'outline' : 'primary'}
                  onClick={() => useActualView('tag')}
                >
                  Actual
                </Button>
                <Button
                  variant={isUsingTagSketchView ? 'primary' : 'outline'}
                  onClick={() => useSketchView('tag')}
                >
                  Sketch
                </Button>
              </div>
            )}

            <div className="ct-car-item__action-right">
              {car?.vin && (
                <Button variant={'outline'} hasIcon={true}>
                  <Icon icon={IconTypes.EllipsesMenu} size={14}></Icon>
                </Button>
              )}
            </div>
          </div>

          {decodedTagData ? (
            <div className="ct-car-item__details">
              {trimTagDisplayFields.map((field) => (
                <div className="ct-car-item__detail">
                  <span className="ct-car-item__detail-label">
                    {field.label}: {decodedTagData?.[field.value]?.value}
                  </span>

                  <span className="ct-car-item__detail-value">
                    {decodedTagData?.[field.value]?.description}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="ct-car-item__details">
              No Tag Data Available Yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Car;
