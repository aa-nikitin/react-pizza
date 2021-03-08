import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { categories as options } from '../constants';
import { Portal, SelectCategory, RaitingNumber, Button } from './';
import { saveFetchPizza } from '../redux/actions';

const PopupForm = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  category,
  rating,
  description,
  activePopup,
  popupRef,
  closePopup,
  typeAction
}) => {
  const dispatch = useDispatch();
  const validPrice = Yup.number()
    .typeError('должно быть числом')
    .min(0, 'не должно быть меньше 0')
    .required('должно быть заполнено');
  return (
    <>
      {activePopup && (
        <Portal id={`edit-pizza-${id}`} clName="pop-up">
          <div ref={popupRef} className="pop-up__workarea">
            <Formik
              initialValues={{
                imagePizza: imageUrl,
                namePizza: name,
                priceThin: types && types[0].price,
                priceThick: types && types[1].price,
                priceSize26: sizes && sizes[0].price,
                priceSize30: sizes && sizes[1].price,
                priceSize40: sizes && sizes[2].price,
                categoryPizza: category,
                raitingPizza: rating,
                description: description
              }}
              validationSchema={Yup.object({
                namePizza: Yup.string().required('должно быть заполнено'),
                priceThin: validPrice,
                priceThick: validPrice,
                priceSize26: validPrice,
                priceSize30: validPrice,
                priceSize40: validPrice,
                categoryPizza: Yup.string().required('категория не выбрана'),
                raitingPizza: Yup.number()
                  .typeError('должно быть числом')
                  .required('Укажите рейтинг от 1 до 10')
              })}
              onSubmit={(values) => {
                dispatch(saveFetchPizza({ ...values, typeAction, id }));
                closePopup();
              }}>
              <Form>
                <div className="field-pizza">
                  <label className="field-pizza__label" htmlFor="imagePizza">
                    Изображение
                  </label>
                  <Field className="field-pizza__input" name="imagePizza" type="text" />
                </div>
                <div className="field-pizza">
                  <label className="field-pizza__label" htmlFor="namePizza">
                    Наименование пиццы
                  </label>
                  <Field className="field-pizza__input" name="namePizza" type="text" />
                  <div className="field-pizza__error">
                    <ErrorMessage className="field-pizza__error" name="namePizza" />
                  </div>
                </div>
                <div className="field-pizza">
                  <label className="field-pizza__label" htmlFor="categoryPizza">
                    Категория
                  </label>
                  <Field
                    className="field-pizza__input"
                    name="categoryPizza"
                    component={SelectCategory}
                    options={options}
                  />
                  <div className="field-pizza__error">
                    <ErrorMessage className="field-pizza__error" name="categoryPizza" />
                  </div>
                </div>
                <div className="field-pizza">
                  <label className="field-pizza__label" htmlFor="raitingPizza">
                    Рейтинг (от 1 до 10)
                  </label>
                  <Field
                    className="field-pizza__input"
                    name="raitingPizza"
                    component={RaitingNumber}
                    min={1}
                    max={10}
                  />
                  <div className="field-pizza__error">
                    <ErrorMessage className="field-pizza__error" name="raitingPizza" />
                  </div>
                </div>
                <div className="fields-pizza-price">
                  <div className="field-pizza fields-pizza-price--col-2">
                    <label className="field-pizza__label" htmlFor="priceThin">
                      Тонкое тесто, руб.
                    </label>
                    <Field className="field-pizza__input" name="priceThin" type="text" />
                    <div className="field-pizza__error">
                      <ErrorMessage className="field-pizza__error" name="priceThin" />
                    </div>
                  </div>
                  <div className="field-pizza fields-pizza-price--col-2">
                    <label className="field-pizza__label" htmlFor="priceThick">
                      Толстое тесто, руб.
                    </label>
                    <Field className="field-pizza__input" name="priceThick" type="text" />
                    <div className="field-pizza__error">
                      <ErrorMessage className="field-pizza__error" name="priceThick" />
                    </div>
                  </div>
                </div>
                <div className="fields-pizza-price">
                  <div className="field-pizza fields-pizza-price--col-3">
                    <label className="field-pizza__label" htmlFor="priceSize26">
                      Размер 26 см, руб.
                    </label>
                    <Field className="field-pizza__input" name="priceSize26" type="text" />
                    <div className="field-pizza__error">
                      <ErrorMessage className="field-pizza__error" name="priceSize26" />
                    </div>
                  </div>
                  <div className="field-pizza fields-pizza-price--col-3">
                    <label className="field-pizza__label" htmlFor="priceSize30">
                      Размер 30 см, руб.
                    </label>
                    <Field className="field-pizza__input" name="priceSize30" type="text" />
                    <div className="field-pizza__error">
                      <ErrorMessage className="field-pizza__error" name="priceSize30" />
                    </div>
                  </div>
                  <div className="field-pizza fields-pizza-price--col-3">
                    <label className="field-pizza__label" htmlFor="priceSize40">
                      Размер 40 см, руб.
                    </label>
                    <Field className="field-pizza__input" name="priceSize40" type="text" />
                    <div className="field-pizza__error">
                      <ErrorMessage className="field-pizza__error" name="priceSize40" />
                    </div>
                  </div>
                </div>
                <div className="field-pizza">
                  <label className="field-pizza__label" htmlFor="imagePizza">
                    Описание
                  </label>
                  <Field
                    className="field-pizza__textarea"
                    name="description"
                    component={'textarea'}
                  />
                </div>
                <div className="field-pizza-buttons">
                  <Button className="button--add field-pizza-buttons__button" outline type="submit">
                    <span>Сохранить</span>
                  </Button>
                  <Button
                    onClick={closePopup}
                    className="button--add field-pizza-buttons__button"
                    type="button"
                    outline>
                    <span>Закрыть</span>
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </Portal>
      )}
    </>
  );
};

export { PopupForm };
