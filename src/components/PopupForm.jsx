import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { categories as options } from '../constants';
// import NumericInput from 'react-numeric-input';

import { Portal, InputNumber } from './';

const PopupForm = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  category,
  rating,
  activePopup,
  popupRef,
  closePopup
}) => {
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
                raitingPizza: rating
              }}
              validationSchema={Yup.object({
                namePizza: Yup.string().required('должно быть заполнено'),
                priceThin: validPrice,
                priceThick: validPrice,
                priceSize26: validPrice,
                priceSize30: validPrice,
                priceSize40: validPrice,
                categoryPizza: Yup.string().required('Выберите категорию'),
                raitingPizza: Yup.number()
                  .typeError('должно быть числом')
                  .required('Укажите рейтинг от 1 до 10')
              })}
              onSubmit={(values) => {
                console.log(values);
              }}>
              <Form>
                <div>
                  <label htmlFor="imagePizza">Изображение</label>
                  <Field name="imagePizza" type="text" />
                  <ErrorMessage name="imagePizza" />
                </div>
                <div>
                  <label htmlFor="namePizza">Наименование пиццы</label>
                  <Field name="namePizza" type="text" />
                  <ErrorMessage name="namePizza" />
                </div>
                <div>
                  <div>
                    <label htmlFor="priceThin">Тонкое тесто, руб.</label>
                    <Field name="priceThin" type="text" />
                    <ErrorMessage name="priceThin" />
                  </div>
                  <div>
                    <label htmlFor="priceThick">Толстое тесто, руб.</label>
                    <Field name="priceThick" type="text" />
                    <ErrorMessage name="priceThick" />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="priceSize26">Размер 26 см, руб.</label>
                    <Field name="priceSize26" type="text" />
                    <ErrorMessage name="priceSize26" />
                  </div>
                  <div>
                    <label htmlFor="priceSize30">Размер 30 см, руб.</label>
                    <Field name="priceSize30" type="text" />
                    <ErrorMessage name="priceSize30" />
                  </div>
                  <div>
                    <label htmlFor="priceSize40">Размер 40 см, руб.</label>
                    <Field name="priceSize40" type="text" />
                    <ErrorMessage name="priceSize40" />
                  </div>
                </div>
                <div>
                  <label htmlFor="categoryPizza">Категория</label>
                  <Field
                    name="categoryPizza"
                    component={({ options, field, form }) => (
                      <Select
                        options={options}
                        name={field.name}
                        value={
                          options ? options.find((option) => option.value === field.value) : ''
                        }
                        onChange={(option) => form.setFieldValue(field.name, option.value)}
                        onBlur={field.onBlur}
                        placeholder="Выберите категорию..."
                      />
                    )}
                    options={options}
                  />
                  <ErrorMessage name="categoryPizza" />
                </div>
                <div>
                  <label htmlFor="raitingPizza">Рейтинг</label>
                  <Field
                    name="raitingPizza"
                    component={({ min, max, field, form }) => (
                      <InputNumber
                        min={min}
                        max={max}
                        value={field.value}
                        onChange={(value) => form.setFieldValue(field.name, value)}
                      />
                    )}
                    min={1}
                    max={10}
                  />
                  <ErrorMessage name="raitingPizza" />
                </div>

                <button type="submit">Submit</button>
              </Form>
            </Formik>
            <div>
              <button onClick={closePopup}>Закрыть</button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export { PopupForm };
