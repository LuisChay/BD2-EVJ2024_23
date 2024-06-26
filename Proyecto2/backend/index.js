require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el módulo CORS

const app = express();
const port = 5000;

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Middleware CORS
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' })); // Ajusta el límite según tus necesidades
app.use(express.json());


// Definir esquemas y modelos de Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  role: String,
  shippingAddress: String,
  paymentMethod: String
}, { collection: 'User' });

const authorSchema = new mongoose.Schema({
  name: String,
  biography: String,
  photoUrl: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
}, { collection: 'Author' });

const bookSchema = new mongoose.Schema({
  title: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  description: String,
  genre: String,
  publicationDate: Date,
  price: Number,
  stock: Number,
  imageUrl: String,
  averageRating: Number
}, { collection: 'Book' });

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String,
  date: Date
}, { collection: 'Review' });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: String,
  paymentMethod: String,
  status: String,
  orderDate: Date
}, { collection: 'Order' });

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    quantity: Number
  }]
}, { collection: 'Cart' });

const User = mongoose.model('User', userSchema);
const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
const Review = mongoose.model('Review', reviewSchema);
const Order = mongoose.model('Order', orderSchema);
const Cart = mongoose.model('Cart', cartSchema);

function startServer() {
// Endpoint para insertar datos iniciales
// ---------------------------------------
// ---------------------------------------
// NO USAR ESTE ENDPOINT
// ---------------------------------------
// ---------------------------------------
app.post('/insert-initial-data', async (req, res) => {
    try {
      // Datos de Usuario
      const user1 = new User({
        name: "Juan",
        lastName: "Pérez",
        age: 30,
        email: "juan@example.com",
        password: "hashedpassword123",
        role: "cliente",
        shippingAddress: "123 Calle Principal, Ciudad",
        paymentMethod: "tarjeta"
      });
      const user2 = new User({
        name: "María",
        lastName: "Gómez",
        age: 25,
        email: "maria@example.com",
        password: "hashedpassword456",
        role: "cliente",
        shippingAddress: "456 Calle Secundaria, Ciudad",
        paymentMethod: "paypal"
      });
      const user3 = new User({
        name: "Pedro",
        lastName: "Ramírez",
        age: 35,
        email: "pedro@example.com",
        password: "hashedpassword789",
        role: "cliente",
        shippingAddress: "789 Calle Terciaria, Ciudad",
        paymentMethod: "tarjeta"
      });
      const userResult1 = await user1.save();
      const userResult2 = await user2.save();
      const userResult3 = await user3.save();
      console.log('Usuarios insertados:', userResult1, userResult2, userResult3);

      // Datos de Autor
      const author1 = new Author({
        name: "Gabriel García Márquez",
        biography: "Escritor colombiano, premio Nobel de Literatura",
        photoUrl: "https://example.com/ggm.jpg",
        books: []
      });
      const author2 = new Author({
        name: "Isabel Allende",
        biography: "Escritora chilena, conocida por sus novelas de realismo mágico",
        photoUrl: "https://example.com/ia.jpg",
        books: []
      });
      const author3 = new Author({
        name: "Mario Vargas Llosa",
        biography: "Escritor peruano, premio Nobel de Literatura",
        photoUrl: "https://example.com/mvl.jpg",
        books: []
      });
      const authorResult1 = await author1.save();
      const authorResult2 = await author2.save();
      const authorResult3 = await author3.save();
      console.log('Autores insertados:', authorResult1, authorResult2, authorResult3);

      // Datos de Libro
      const book1 = new Book({
        title: "Cien años de soledad",
        authorId: authorResult1._id,
        description: "Novela emblemática del realismo mágico",
        genre: "Ficción",
        publicationDate: new Date("1967-05-30"),
        price: 15.99,
        stock: 50,
        imageUrl: "https://example.com/cien-anios.jpg",
        averageRating: 4.8
      });
      const book2 = new Book({
        title: "La casa de los espíritus",
        authorId: authorResult2._id,
        description: "Novela de realismo mágico y fantasía",
        genre: "Ficción",
        publicationDate: new Date("1982-01-01"),
        price: 12.99,
        stock: 30,
        imageUrl: "https://example.com/casa-espiritus.jpg",
        averageRating: 4.7
      });
      const book3 = new Book({
        title: "La ciudad y los perros",
        authorId: authorResult3._id,
        description: "Primera novela del autor, ambientada en un colegio militar",
        genre: "Ficción",
        publicationDate: new Date("1963-01-01"),
        price: 14.99,
        stock: 20,
        imageUrl: "https://example.com/ciudad-perros.jpg",
        averageRating: 4.6
      });
      const bookResult1 = await book1.save();
      const bookResult2 = await book2.save();
      const bookResult3 = await book3.save();
      console.log('Libros insertados:', bookResult1, bookResult2, bookResult3);

      authorResult1.books.push(bookResult1._id);
      await authorResult1.save();
      authorResult2.books.push(bookResult2._id);
      await authorResult2.save();
      authorResult3.books.push(bookResult3._id);
      await authorResult3.save();

      // Datos de Reseña
      const review1 = new Review({
        bookId: bookResult1._id,
        userId: userResult1._id,
        rating: 5,
        comment: "Una obra maestra de la literatura",
        date: new Date("2024-06-15")
      });
      const review2 = new Review({
        bookId: bookResult2._id,
        userId: userResult2._id,
        rating: 4,
        comment: "Una historia fascinante",
        date: new Date("2024-06-16")
      });
      const review3 = new Review({
        bookId: bookResult3._id,
        userId: userResult3._id,
        rating: 4.5,
        comment: "Intrigante y conmovedora",
        date: new Date("2024-06-17")
      });
      const reviewResult1 = await review1.save();
      const reviewResult2 = await review2.save();
      const reviewResult3 = await review3.save();
      console.log('Reseñas insertadas:', reviewResult1, reviewResult2, reviewResult3);

      // Datos de Orden
      const order1 = new Order({
        userId: userResult1._id,
        items: [
          {
            bookId: bookResult1._id,
            quantity: 1,
            price: 15.99
          }
        ],
        totalAmount: 15.99,
        shippingAddress: "123 Calle Principal, Ciudad",
        paymentMethod: "tarjeta",
        status: "en proceso",
        orderDate: new Date("2024-06-20")
      });
      const order2 = new Order({
        userId: userResult2._id,
        items: [
          {
            bookId: bookResult2._id,
            quantity: 2,
            price: 25.98
          }
        ],
        totalAmount: 25.98,
        shippingAddress: "456 Calle Secundaria, Ciudad",
        paymentMethod: "paypal",
        status: "en proceso",
        orderDate: new Date("2024-06-21")
      });
      const order3 = new Order({
        userId: userResult3._id,
        items: [
          {
            bookId: bookResult3._id,
            quantity: 1,
            price: 14.99
          }
        ],
        totalAmount: 14.99,
        shippingAddress: "789 Calle Terciaria, Ciudad",
        paymentMethod: "tarjeta",
        status: "en proceso",
        orderDate: new Date("2024-06-22")
      });
      const orderResult1 = await order1.save();
      const orderResult2 = await order2.save();
      const orderResult3 = await order3.save();
      console.log('Ordenes insertadas:', orderResult1, orderResult2, orderResult3);

      // Datos de Carrito
      const cart1 = new Cart({
        userId: userResult1._id,
        items: [
          {
            bookId: bookResult1._id,
            quantity: 1
          }
        ]
      });
      const cart2 = new Cart({
        userId: userResult2._id,
        items: [
          {
            bookId: bookResult2._id,
            quantity: 2
          }
        ]
      });
      const cart3 = new Cart({
        userId: userResult3._id,
        items: [
          {
            bookId: bookResult3._id,
            quantity: 1
          }
        ]
      });
      const cartResult1 = await cart1.save();
      const cartResult2 = await cart2.save();
      const cartResult3 = await cart3.save();
      console.log('Carritos insertados:', cartResult1, cartResult2, cartResult3);

      res.json({
        message: "Datos iniciales insertados correctamente",
        userInserted: [userResult1._id, userResult2._id, userResult3._id],
        authorInserted: [authorResult1._id, authorResult2._id, authorResult3._id],
        bookInserted: [bookResult1._id, bookResult2._id, bookResult3._id],
        reviewInserted: [reviewResult1._id, reviewResult2._id, reviewResult3._id],
        orderInserted: [orderResult1._id, orderResult2._id, orderResult3._id],
        cartInserted: [cartResult1._id, cartResult2._id, cartResult3._id]
      });
    } catch (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).json({ error: 'Error al insertar datos iniciales' });
    }
  });

  // Endpoint para agregar un libro
  app.post('/libros/addlibro', async (req, res) => {
    try {
      const { title, authorId, description, genre, publicationDate, price, stock, imageUrl, averageRating } = req.body;
      const book = new Book({
        title,
        authorId,
        description,
        genre,
        publicationDate,
        price,
        stock,
        imageUrl,
        averageRating
      });
      const newBook = await book.save();
      res.json(newBook);
    } catch (err) {
      console.error('Error al agregar libro:', err);
      res.status(500).json({ error: 'Error al agregar libro' });
    }
  });

  // Endpoint para obtener todos los libros
  app.get('/libros/getlibros', async (req, res) => {
    try {
      const books = await Book.find().populate('authorId').exec();
      res.json(books);
    } catch (err) {
      console.error('Error al obtener libros:', err);
      res.status(500).json({ error: 'Error al obtener libros' });
    }
  });

  // Endpoint para obtener un libro por su ID
  app.get('/libros/getlibro/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate('authorId').exec();
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    } catch (err) {
      console.error('Error al obtener libro:', err);
      res.status(500).json({ error: 'Error al obtener libro' });
    }
  });

  // Endpoint para editar un libro por su ID
  app.post('/libros/editlibro/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).exec();
      if (book) {
        const { title, authorId, description, genre, publicationDate, price, stock, imageUrl, averageRating } = req.body;
        book.title = title;
        book.authorId = authorId;
        book.description = description;
        book.genre = genre;
        book.publicationDate = publicationDate;
        book.price = price;
        book.stock = stock;
        book.imageUrl = imageUrl;
        book.averageRating = averageRating;
        const updatedBook = await book.save();
        res.json(updatedBook);
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    } catch (err) {
      console.error('Error al editar libro:', err);
      res.status(500).json({ error: 'Error al editar libro' });
    }
  });

  // Endpoint para eliminar un libro por su ID
app.post('/libros/deletelibro/:id', async (req, res) => {
  try {
    const result = await Book.deleteOne({ _id: req.params.id }).exec();
    if (result.deletedCount > 0) {
      res.json({ message: 'Libro eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (err) {
    console.error('Error al eliminar libro:', err);
    res.status(500).json({ error: 'Error al eliminar libro' });
  }
});


  // Endpoint para obtener autores
  app.get('/autores', async (req, res) => {
    try {
      const authors = await Author.find().populate('books').exec();
      res.json(authors);
    } catch (err) {
      console.error('Error al obtener autores:', err);
      res.status(500).json({ error: 'Error al obtener autores' });
    }
  });


  // Manejo de errores
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Error de sintaxis en JSON:', err);
    return res.status(400).json({ error: 'Error de sintaxis en JSON' });
  }
  next();
});

  app.listen(port, () => {
    console.log(`Servidor API ejecutándose en http://localhost:${port}`);
  });
}

// Conectar a la base de datos con el nombre especificado
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbName })
  .then(() => {
    console.log(`Conexión a la base de datos ${dbName} establecida`);
    startServer();
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });
