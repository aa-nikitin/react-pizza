const { Router } = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Pizzas = require('../models/pizzas');
const { v4: uuidv4 } = require('uuid');
const router = Router();

// let form = new formidable.IncomingForm();

router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizzas.find({});
    res.json(pizzas);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

const validation = (fields, files) => {
  // console.log(files.images.type);
  if (files.images.length && files.images.length > 1) {
    return { status: 'Большое количество файлов!', err: true };
  }
  if (files.images.name === '' || files.images.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true };
  }
  if (files.images.size > 20000000) {
    return { status: 'Слишком большой файл!', err: true };
  }
  if (files.images.type !== 'image/jpeg' && files.images.type !== 'image/png') {
    return { status: 'Файл не является изображением!', err: true };
  }
  return { status: 'Ok', err: false };
};

const asyncMkdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

const asyncUnlink = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

const asyncRename = (path, fileName) => {
  return new Promise((resolve, reject) => {
    fs.rename(path, fileName, function (err) {
      if (err) {
        return reject({ status: err, err: true });
      }
      return resolve();
    });
  });
};

const aaa = (req) => {
  // const form = new formidable.IncomingForm({ multiples: true });
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    const upload = path.join('./', 'files');

    if (!fs.existsSync(upload)) {
      asyncMkdir(upload);
    }
    const pathFiles = [];
    form.uploadDir = path.join(process.cwd(), upload);
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      const valid = validation(fields, files);
      const filesArray = files.images.constructor !== Array ? [files.images] : files.images;
      // console.log();
      filesArray.forEach((file) => {
        if (valid.err) {
          asyncUnlink(file.path);
          return reject(valid.status);
        }

        const fileName = path.join(upload, file.name);
        pathFiles.push(fileName);
        asyncRename(file.path, fileName);
      });
      resolve({ fields, images: filesArray[0], filePath: pathFiles[0] });
    });
  });
};

router.post('/pizzas', async (req, res) => {
  try {
    const bbb = await aaa(req);
    const { filePath, fields } = bbb;
    const {
      name,
      priceThick,
      priceThin,
      priceSize26,
      priceSize30,
      priceSize40,
      categoryPizza,
      raitingPizza,
      description
    } = fields;
    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     next(err);
    //     return;
    //   }

    //   console.log(fields, files);
    //   res.json({});
    // });
    // console.log(bbb.fields.name);
    const pizza = await new Pizzas({
      imageUrl: filePath,
      name: name,
      types: [
        {
          id: 0,
          price: priceThin
        },
        {
          id: 1,
          price: priceThick
        }
      ],
      sizes: [
        {
          id: 26,
          price: priceSize26
        },
        {
          id: 30,
          price: priceSize30
        },
        {
          id: 40,
          price: priceSize40
        }
      ],
      price: 300,
      category: categoryPizza,
      rating: raitingPizza,
      description: description,
      id: uuidv4()
    });
    await pizza.save();
    await res.json({ message: pizza });
    // res.json({});
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
