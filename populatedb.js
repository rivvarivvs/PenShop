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
            notebookCreate(brand[3], 'A4 Notebook', '$5.00', 'This is a simple A4 notebook that gets you ready for school!', '4', callback);
        },
        function(callback) {
            notebookCreate(brand[4], 'Soft A5 Notebook', '$15.00', 'This soft and small notebook fits right into your purse. This is a limited edition from the renowed brand Moleskin', '1', callback);
        },
        function(callback) {
            notebookCreate(brand[4], 'A4 Journal','$20.00', 'A product created and designed to keep you on schedule and on top of all professional things', '10', callback);
        },
        ],
        // optional callback
        cb);
}


function createPen(cb) {
    async.parallel([
        function(callback) {
            penCreate('Fountain pen Essentio', '$50.00', '2', brand[0], 'A high-end pen to satisfy all your luxurious writing needs', callback)
        },
        function(callback) {
            penCreate('Neo Slim metal fountain pen', '$30.00', '8', brand[0], 'When it comes to design, young professionals and trend-setters who keep pace with the times have specific expectations: they expect a sophisticated and modern look and a cool, smooth feel. This is where the new Neo Slim comes in as it meets these very needs: The writing instruments in the series have an especially slim design. ', callback)
        },
        function(callback) {
            penCreate('Souveran Black-Blue', '$150.00', '1', brand[1], 'In the year 1929 Pelikan was the first company in the world to introduce the differentiated piston mechanism. This technique causes the spindle inside the fountain pen to turn quicker than the end piece of the barrel, with the help of two different threads. To this date, this fountain pen exists in many different variations, and though it has been developed in design and technical details over time, the basic mechanism remains the same.', callback)
        },
        function(callback) {
            penCreate('IM Rollerball Black pen', '$5.00', '39', brand[2], 'test1', callback)
        },
        function(callback) {
            penCreate('Souveran Black-Blue', '$150.00', '1', brand[1], 'In the year 1929 Pelikan was the first company in the world to introduce the differentiated piston mechanism. This technique causes the spindle inside the fountain pen to turn quicker than the end piece of the barrel, with the help of two different threads. To this date, this fountain pen exists in many different variations, and though it has been developed in design and technical details over time, the basic mechanism remains the same.', callback)
        },
        ],
        // Optional callback
        cb);
}

function createPencil(cb) {
    async.parallel([
        function(callback) {
            pencilCreate('Castell 9000 2B', brand[0], '$1.48', 'Classic 2B pencil', 3, callback)
        },
        function(callback) {
            pencilCreate('Blackwing Volume XIX', brand[], '$28.43', 'The Blackwing XIX is our tribute to the 19th Amendment and the ongoing fight for voting rights in the United States and around the world. It features a purple barrel and three-sided white and golden yellow imprint inspired by the suffrage flag, striped silver ferrule, and purple eraser. The 36 yellow stars represent the 36 states that ratified the amendment. The firm graphite is perfect for writing a letter to your Representatives or making your voting plan.', '32', callback)
        },
        function(callback) {
            pencilCreate('penciltest', brand[5], '$0.00', 'This one is for free', '1000000', callback)
        },
        function(callback) {
            pencilCreate('testpencil', brand[5], '$0.01', 'This one is almost for free!', '500', callback)
        }
    ])
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
        console.log('Products: '+ pen, pencil, notebook);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



