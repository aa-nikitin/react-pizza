module.exports.validFile = (fields, files) => {
  if (Object.keys(files).length) {
    if (files.images.length && files.images.length > 1) {
      return { status: 'Большое количество файлов!', err: true };
    }
    //   if (files.images.name === '' || files.images.size === 0) {
    //     return { status: 'Не загружена картинка!', err: true };
    //   }
    if (!fields.name) {
      return { status: 'Не указано наименование!', err: true };
    }
    if (files.images.size > 10000000) {
      return { status: 'Слишком большой файл!', err: true };
    }
    if (
      files.images.size > 0 &&
      files.images.type !== 'image/jpeg' &&
      files.images.type !== 'image/png'
    ) {
      return { status: 'Файл не является изображением!', err: true };
    }
  }
  if (
    (!Number(fields.priceThin) && !Number(fields.priceThick)) ||
    (!Number(fields.priceSize26) && !Number(fields.priceSize30) && !Number(fields.priceSize40))
  ) {
    return {
      status:
        'Необходимо что бы хотя бы один параметр цены был заполнен в толщине теста пицы и один параметр в диаметре пиццы',
      err: true
    };
  }
  return { status: 'Ok', err: false };
};
