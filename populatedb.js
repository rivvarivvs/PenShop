#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Brand = require('./models/brand')
const Notebook = require('./models/notebookmodel')
const Pencil = require('./models/pencilmodel')
const Pen = require('./models/penmodel')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const brand = []
const notebook = []
const pencil = []
const pen = []

function brandCreate(name, cb) {
  const brand = new Brand({ name: name });
       
  brand.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Brand: ' + brand);
    brand.push(brand)
    cb(null, brand)
  }  );
}

function notebookCreate(name, cb) {
    const notebookDetail = {
        name: name,
        price: price,
        details: details,
        stock: stock
    } 
    if (brand != false) notebookDetail.brand = brand
  
    const notebook = new Notebook(notebookDetail);
       
  notebook.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Notebook model: ' + notebook);
    notebook.push(notebook)
    cb(null, notebook);
  }   );
}

function penCreate(name, price, details, stock, cb) {
  const penDetail = { 
    name: name,
    price: price,
    details: details,
    stock: stock
  }
  if (brand != false) bookdetail.brand = brand
    
  const pen = new Pen(penDetail);    
  pen.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Pen model: ' + pen);
    pen.push(pen)
    cb(null, pen)
  }  );
}


function pencilCreate(name, price, details, stock, cb) {
    const pencilDetail = { 
        name: name,
        price: price,
        details: details,
        stock: stock
      }   
    if (brand != false) bookdetail.brand = brand
    
  const pencil = new Pencil(pencilDetail);    
  pencil.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Pencil model: ' + pencil);
    pencil.push(pencil)
    cb(null, pencil)
  }  );
}


function createBrand(cb) {
    async.series([
        function(callback) {
            brandCreate('Faber-Castell', '', callback);
        },
        function(callback) {
            brandCreate('Pelikan', '', callback);
        },
        function(callback) {
            brandCreate('Parker', '', callback);
        },
        function(callback) {
            brandCreate('Carlton', '', callback);
        },
        function(callback) {
            brandCreate('Moleskine', '', callback);
        },
        function(callback) {
            brandCreate('Palomino', '', callback);
        },
        function(callback) {
            brandCreate('Grafo', '', callback);
        },
        ],
        // optional callback
        cb);
}


function createNotebook(cb) {
    async.parallel([
        function(callback) {
            notebookCreate(brand[3], 'A4 Notebook', '$5.00', 'This is a simple A4 notebook that gets you ready for school!', '4','9781473211896', callback);
        },
        function(callback) {
            notebookCreate(brand[4], 'Soft A5 Notebook', '$15.00', 'This soft and small notebook fits right into your purse. This is a limited edition from the renowed brand Moleskin', '1', '9788401352836', callback);
        },
        function(callback) {
            notebookCreate(brand[4], 'A4 Journal','$20.00', 'A product created and designed to keep you on schedule and on top of all professional things', '9780765379528', '10', callback);
        },
        ],
        // optional callback
        cb);
}


function createPen(cb) {
    async.parallel([
        function(callback) {
          bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // Optional callback
        cb);
}

function createPencil(cb) {

}



async.series([
    createBrand,
    createNotebook,
    createPen,
    createPencil
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Products: '+pen, pencil, notebook);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



