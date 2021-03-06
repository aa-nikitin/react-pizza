import React from 'react';
import Select from 'react-select';
import { InputNumber } from './';

const colourStyles = {
  control: (styles, state) => ({
    ...styles,
    borderColor: state.menuIsOpen ? '#fe5f1e' : '#ccc',
    boxShadow: 'none',
    hover: {
      borderColor: 'red'
    }
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? '#fe5f1e' : isFocused ? '#f7c2ae' : '#fff'
  })
};

const SelectCategory = ({ options, field, form }) => (
  <Select
    options={options}
    name={field.name}
    value={options ? options.find((option) => option.value === field.value) : ''}
    onChange={(option) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
    placeholder="Выберите категорию..."
    styles={colourStyles}
    className="select-category"
  />
);

const RaitingNumber = ({ min, max, field, form }) => (
  <InputNumber
    min={min}
    max={max}
    value={field.value}
    onChange={(value) => form.setFieldValue(field.name, value)}
  />
);

export { SelectCategory, RaitingNumber };
