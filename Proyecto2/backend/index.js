require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el módulo CORS
const AWS = require('aws-sdk'); // Importar el módulo AWS SDK

const app = express();
const port = 5000;

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const awsaccesid = process.env.AWS_ACCESS_KEY_ID;
const awsacceskey = process.env.AWS_SECRET_ACCESS_KEY;
const awsregion = process.env.AWS_REGION;

// Configurar AWS SDK con las credenciales de acceso
const s3bucket = new AWS.S3({
  accessKeyId: awsaccesid,
  secretAccessKey: awsacceskey,
  region: awsregion
});

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
  paymentMethod: String,
  profilePhotoUrl: String // Nuevo campo para la foto de perfil
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

// --------------------------------------------
// LA FUNCION FUNCIONA CUANDO LA BASE64 TRAE UN ENCABEZADO COMO ESTE
// data:image/jpeg;base64,/9j/4AAQSkZJRg
// VERIFICAR QUE MANDEN IGUAL SUS IMAGENES PARA QUE NO HAYA PROBLEMAS
// --------------------------------------------
// Los libros se guardan en una carpeta llamada "Libros" en Amazon S3
// Los nombres de sus carpetas dejenlo definido aca para que no haya clavo y se creen mas carpetas y se pierdan o le cobren a la cuenta

// Función para subir una imagen a Amazon S3

function subirImagenBase64(data, nombreArchivo, carpeta) {
  // Eliminar el encabezado de la cadena base64
  const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
  // Convertir la cadena base64 a un buffer
  const buffer = Buffer.from(base64Data, 'base64');

  // Configurar los parámetros para la carga a S3
  const params = {
    Bucket: 'proyecto2-bd2',
    Key: `${carpeta}/${nombreArchivo}`,
    Body: buffer,
    ContentType: 'image/jpeg'
  };

  // Realizar la carga a S3 y devolver una promesa
  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

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

      // Subir imagen a Amazon S3
      //console.log(imageUrl)
      const imageUrlS3 = await subirImagenBase64(imageUrl, `${title}.jpg`, 'Libros');
      console.log('Imagen subida a Amazon S3:', imageUrlS3);

      const book = new Book({
        title,
        authorId,
        description,
        genre,
        publicationDate,
        price,
        stock,
        imageUrl: imageUrlS3,
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

  // Endpoint para obtener todos los usuarios
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find().exec();
      res.json(users);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  });

  // Endpoint para obtener todos los pedidos
  app.get('/orders', async (req, res) => {
    const { user } = req.query;
    //console.log(user)
    try {
      const orders = await Order.find({ userId: user }).exec();
      res.json(orders);
    } catch (err) {
      console.error('Error al obtener ordenes:', err);
      res.status(500).json({ error: 'Error al obtener ordenes' });
    }
  });

  // Endpoint para obtener el carrito
  app.get('/cart', async (req, res) => {
    const { user } = req.query;
    //console.log(user)
    try {
      const cart = await Cart.find({ userId: user }).exec();
      res.json(cart);
    } catch (err) {
      console.error('Error al obtener el carrito:', err);
      res.status(500).json({ error: 'Error al obtener el carrito' });
    }
  });

  // Endpoint para agregar un elemento al carrito
  app.post('/api/cart/add', async (req, res) => {
    const { user, bookId, quantity } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: 'UserId o bookId invalido' });
      }

      const updatedCart = await Cart.findOneAndUpdate(
        { user },
        { $push: { items: { bookId, quantity } } },
        { new: true, upsert: true }
      );

      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: `Error al agregar elementos al carrito: ${error.message}` });
    }
  });

  // Endpoint para actualizar la cantidad de un elemento en el carrito
  app.post('/api/cart/updquantity', async (req, res) => {
    const { user, bookId, quantity } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: 'UserId o bookId invalido' });
      }

      const cart = await Cart.findOne({ user });
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'No existe el elemento en el carrito' });
      }

      cart.items[itemIndex].quantity = quantity;
      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: `Error al modificar la cantidad: ${error.message}` });
    }
  });

  // Endpoint para eliminar un elemento del carrito
  app.delete('/api/cart/deleteone', async (req, res) => {
    const { user, bookId } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: 'UserId o bookId invalido' });
      }

      const result = await Cart.updateOne(
        { user },
        { $pull: { items: { bookId } } }
      );

      if (result.nModified === 0) {
        return res.status(404).json({ error: 'No existe el elemento en el carrito' });
      }

      res.send('Elemento eliminado exitosamente');
    } catch (error) {
      res.status(500).json({ error: `Error al eliminar elemento en el carrito: ${error.message}` });
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
        const imageUrlS3 = await subirImagenBase64(imageUrl, `${title}.jpg`, 'Libros');
        console.log('Imagen editada subida a Amazon S3:', imageUrlS3);

        book.title = title;
        book.authorId = authorId;
        book.description = description;
        book.genre = genre;
        book.publicationDate = publicationDate;
        book.price = price;
        book.stock = stock;
        book.imageUrl = imageUrlS3;
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
  app.get('/getAutors', async (req, res) => {
    try {
      const authors = await Author.find({}).exec();
      // const authors = await Author.find({}, { books: 0 }).exec();
      res.json(authors);
    } catch (err) {
      console.error('Error al obtener autores:', err);
      res.status(500).json({ error: 'Error al obtener autores' });
    }
  });

  // Endpoint para eliminar un autor por su Id
  app.delete('/deleteAutor/:id', async (req, res) => {
    try {
      const authorId = req.params.id;
      const result = await Author.deleteOne({ _id: authorId }).exec();
      if (result.deletedCount > 0) {
        res.json({ message: 'Autor eliminado exitosamente' });
      } else {
        res.status(404).json({ error: 'Autor no encontrado' });
      }
    } catch (err) {
      console.error('Error al eliminar autor:', err);
      res.status(500).json({ error: 'Error al eliminar autor' });
    }
  });


  // Endpoint para agregar un autor
  app.post('/addAutor', async (req, res) => {
    const { name, biography, photoUrl } = req.body;

    // Validación de parámetros requeridos
    if (!name || !biography || !photoUrl) {
      return res.status(400).json({ error: 'Todos los parámetros son requeridos' });
    }

    // Subir imagen a Amazon S3
    const imageUrlS3 = await subirImagenBase64(photoUrl, `${name}.jpg`, 'Autores');
    console.log('Imagen subida a Amazon S3:', imageUrlS3);
    const newAuthor = new Author({
      name,
      biography,
      photoUrl: imageUrlS3,
      books: []
    });
    try {
      const savedAuthor = await newAuthor.save();
      res.status(201).json(savedAuthor);
    } catch (err) {
      console.error('Error al agregar autor:', err);
      res.status(500).json({ error: 'Error al agregar autor' });
    }
  });


  /*-----------------------------CATALOGO DE AUTORES */
  app.get('/authors', async (req, res) => {
    try {
      const autores = await Author.find().exec();
      res.json(autores);
    } catch (err) {
      console.error('Error al obtener libros:', err);
      res.status(500).json({ error: 'Error al obtener Autores' });
    }
  });

  //Encontrar un autor por su ID
  app.post('/author', async (req, res) => {
    try {
      const { authorId } = req.body;

      //validar que no venga vacio
      if (!authorId) {
        return res.status(400).json({ error: 'ID del autor requerido' });
      }

      // Buscar al autor por su ID
      const autor = await Author.findById(authorId).populate('books').exec();

      // Validar que el autor exista
      if (!autor) {
        return res.status(404).json({ error: 'Autor no encontrado' });
      }

      res.json(autor);

    } catch (err) {
      console.error('Error al obtener autor:', err);
      res.status(500).json({ error: 'Error al obtener autor' });
    }
  });


  /*--------------MANEJO DE USUARIOS -------------------*/
  // Registrar un usuario
  app.post('/register', async (req, res) => {
    try {
      const { name, lastName, age, email, password, shippingAddress, paymentMethod, profilePhotoUrl, nameImage } = req.body;

      //console.log("NAMEIMAGE:",nameImage)

      // Validar que todos los campos requeridos están presentes
      if (!name || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }

      // Verificar si el correo ya está registrado
      const usuarioExistente = await User.findOne({ email }).exec();
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      // Asignar una URL de foto predeterminada si no se proporciona
      console.log("imagebase64:", profilePhotoUrl)
      var urlS3 = "https://proyecto2-bd2.s3.amazonaws.com/Usuarios/userPredeterminada.png";
      if (profilePhotoUrl) {
        const imageUrlS3 = await subirImagenBase64(profilePhotoUrl, nameImage, "Usuarios");
        console.log("urlS3:", imageUrlS3)
        var urlS3 = imageUrlS3;
      }

      // Crear un nuevo usuario
      const nuevoUsuario = new User({
        name,
        lastName,
        age,
        email,
        password,
        role: "Cliente",
        shippingAddress,
        paymentMethod,
        profilePhotoUrl: urlS3
      });

      // Guardar el nuevo usuario en la base de datos
      await nuevoUsuario.save();
      res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  });

  //Iniciar sesión
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validar que el correo y la contraseña estén presentes
      if (!email || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
      }

      // Buscar al usuario por su correo electrónico
      const usuario = await User.findOne({ email }).exec();

      // Validar que el usuario exista
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const useObject = usuario.toObject();
      // Validar la contraseña
      if (password !== useObject.password) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      res.json(usuario);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  });


  // Obtener la información de un usuario por su ID
  app.post('/user', async (req, res) => {
    try {
      const { userId } = req.body;

      //validar que no venga vacio
      if (!userId) {
        return res.status(400).json({ error: 'ID del autor requerido' });
      }

      // Buscar al autor por su ID
      const usuario = await User.findById(userId).exec();

      // Validar que el autor exista
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(usuario);

    } catch (err) {
      console.error('Error al obtener Usuario:', err);
      res.status(500).json({ error: 'Error al obtener Usuario' });
    }
  });
<<<<<<< HEAD
  
     //Endpoint para obtener libros del usuario que inicio sesion
 app.post("/get_books", async(req, res) => {

  //obtener nombre del usuario
  const { idUser } = req.body

  //Buscar el user y obtener su id
  try {
   

    //Buscar las ordenes que tengan el usuario por su id.
    const ordenes = await Order.find({userId: idUser}).exec();
    if(ordenes){

      let idLibros = []
    
    for(let c = 0; c < ordenes.length; c++) {
      //console.log(ordenes[c])
      let item = ordenes[c].items
      //Recorre los items de cada orden para obtener el id de cada libro.
      for(let i = 0; i < item.length; i++) {
        
        
        idLibros.push(item[i].bookId)
      }

    }

    let libros = []

    for(let c = 0; c < idLibros.length; c++) {
      //console.log(idLibros[c])
      const libro = await Book.find({_id: idLibros[c]}).exec()
      const titulo = libro[0].title
      const authorid = libro[0].authorId
      const autor = await Author.find({_id: authorid}).exec()
      const nameAutor = autor[0].name
      const descripcion = libro[0].description
      const genero = libro[0].genre
      const disponibilidad = libro[0].stock 
      const puntuacion = libro[0].averageRating 
      const imagen = libro[0].imageUrl


      
      const comentarios = await Review.find({bookId: idLibros[c]}).exec()
      let reseñas = []
      for(let i = 0; i < comentarios.length; i++) {
        const idUsuario = comentarios[i].userId
        const usuario = await User.find({_id: idUsuario}).exec()
        const nombre = usuario[0].name
        const comentario = comentarios[i].comment 
        const fecha = comentarios[i].date 
        const rating = comentarios[i].rating 
        


        const nuevo_comentario = {
          "nombre": nombre,
          "comentario": comentario,
          "fecha": fecha,
          "rating": rating 
        }
        reseñas.push(nuevo_comentario)
      }

      const nuevo_libro = {
        "titulo": titulo,
        "autor": nameAutor,
        "descripcion": descripcion,
        "genero": genero,
        "disponibilidad": disponibilidad,
        "puntuacion": puntuacion,
        "reseñas": reseñas,
        "imagen": imagen
      }

      libros.push(nuevo_libro)
      
    }

    //Buscar el libro por su id y los comentarios por el id de libro.
    res.send(libros)
      
    } 
    



  } catch (err) {
    console.error("Error al obtener el id del usuario:", err);
    res.status(500).json({ error: "Error al obtner el id del usuario"})

  }

  





})

//Endpoint para insertar una reseña
app.post("/resenia", async(req, res) => {
  const { titulo, comentario, idUser, date, rating } = req.body
  
  try {

    //buscar id del libro
    const libro = await Book.find({title: titulo}).exec();

    //buscar id del usuario y validar que existe
    const usuario = await User.find({_id: idUser}).exec();

    if (usuario) {
      const new_review = new Review({
        bookId: libro[0]._id,
        userId: idUser,
        rating: rating,
        comment: comentario,
        date: date
      });

      //Actualizar rating del libro
      const comentarios = await Review.find({bookId: libro[0]._id}).exec()

      let valor = 0;
      let suma = 0;
      for(let i = 0; i < comentarios.length; i++) {
        valor+=1
  
        const rating = comentarios[i].rating 
        suma+=rating
      
      }

      console.log(valor)

      let rating_promedio = suma/valor 
      

      libro[0].averageRating = rating_promedio.toFixed(1);
      await libro[0].save();


  
      const reviewResult = await new_review.save()
      console.log("review insertada:", reviewResult)
      res.json({Mensaje: "Insertado con exito"})
    } else {
      console.error("Error al insertar una review:", err);
      res.status(500).json({error: "No existe el usuario"});
    }




    


  } catch(err) {
    console.error("Error al insertar una review:", err);
    res.status(500).json({error: "Error al insertar review"});
  }


})

//Endpoint para busqueda y filtrado
app.post("/busqueda", async(req, res) => {

  const { valor, filtro } = req.body

  try {
    let libros = []
    
    if(filtro == "Genero") {
      const books = await Book.find({genre: valor});
      for(let c = 0; c < books.length; c++) {
        //obtener datos
        const titulo = books[c].title;
        const autorId = books[c].authorId;
        const autor = await Author.find({_id: autorId})
        const nombre_autor = autor[0].name;
        const descripcion = books[c].description;
        const genero = books[c].genre
        const fecha = books[c].publicationDate 
        const precio = books[c].price 
        const stock = books[c].stock
        const imagen = books[c].imageUrl
        const rating = books[c].averageRating 

        const nuevo_objeto = {
          "name": nombre_autor
        }
        

        const nuevo_libro = {
          "title": titulo,
          "authorId": nuevo_objeto,
          "description": descripcion, 
          "genre": genero, 
          "publicationDate": fecha,
          "price": precio, 
          "stock": stock,
          "imageUrl": imagen,
          "averageRating": rating 
        }
        libros.push(nuevo_libro)
      }

    } else if (filtro == "Titulo") {
      const books = await Book.find({title: valor});
      for(let c = 0; c < books.length; c++) {
        //obtener datos
        const titulo = books[c].title;
        const autorId = books[c].authorId;
        const autor = await Author.find({_id: autorId})
        const nombre_autor = autor[0].name;
        const descripcion = books[c].description;
        const genero = books[c].genre
        const fecha = books[c].publicationDate 
        const precio = books[c].price 
        const stock = books[c].stock
        const imagen = books[c].imageUrl
        const rating = books[c].averageRating 

        const nuevo_objeto = {
          "name": nombre_autor
        }
        

        const nuevo_libro = {
          "title": titulo,
          "authorId": nuevo_objeto,
          "description": descripcion, 
          "genre": genero, 
          "publicationDate": fecha,
          "price": precio, 
          "stock": stock,
          "imageUrl": imagen,
          "averageRating": rating 
        }
        libros.push(nuevo_libro)
      }

    } else if (filtro == "Precio") {
      
      const floatValue = parseFloat(valor);
      const books = await Book.find({ price: {$lt: floatValue} });
      for(let c = 0; c < books.length; c++) {
        //obtener datos
        const titulo = books[c].title;
        const autorId = books[c].authorId;
        const autor = await Author.find({_id: autorId})
        const nombre_autor = autor[0].name;
        const descripcion = books[c].description;
        const genero = books[c].genre
        const fecha = books[c].publicationDate 
        const precio = books[c].price 
        const stock = books[c].stock
        const imagen = books[c].imageUrl
        const rating = books[c].averageRating 

        const nuevo_objeto = {
          "name": nombre_autor
        }
        

        const nuevo_libro = {
          "title": titulo,
          "authorId": nuevo_objeto,
          "description": descripcion, 
          "genre": genero, 
          "publicationDate": fecha,
          "price": precio, 
          "stock": stock,
          "imageUrl": imagen,
          "averageRating": rating 
        }
        libros.push(nuevo_libro)
      }


    } else if (filtro == "Puntuacion") {
      const floatValue = parseFloat(valor);
      const books = await Book.find({ averageRating: { $lt: floatValue } });
      for(let c = 0; c < books.length; c++) {
        //obtener datos
        const titulo = books[c].title;
        const autorId = books[c].authorId;
        const autor = await Author.find({_id: autorId})
        const nombre_autor = autor[0].name;
        const descripcion = books[c].description;
        const genero = books[c].genre
        const fecha = books[c].publicationDate 
        const precio = books[c].price 
        const stock = books[c].stock
        const imagen = books[c].imageUrl
        const rating = books[c].averageRating 

        const nuevo_objeto = {
          "name": nombre_autor
        }
        

        const nuevo_libro = {
          "title": titulo,
          "authorId": nuevo_objeto,
          "description": descripcion, 
          "genre": genero, 
          "publicationDate": fecha,
          "price": precio, 
          "stock": stock,
          "imageUrl": imagen,
          "averageRating": rating 
        }
        libros.push(nuevo_libro)
      }

    } else if (filtro == "Autor") {
      const idAutor = await Author.find({name: valor})
      const books = await Book.find({authorId: idAutor});
      for(let c = 0; c < books.length; c++) {
        //obtener datos
        const titulo = books[c].title;
        const autorId = books[c].authorId;
        const autor = await Author.find({_id: autorId})
        const nombre_autor = autor[0].name;
        const descripcion = books[c].description;
        const genero = books[c].genre
        const fecha = books[c].publicationDate 
        const precio = books[c].price 
        const stock = books[c].stock
        const imagen = books[c].imageUrl
        const rating = books[c].averageRating 

        const nuevo_objeto = {
          "name": nombre_autor
        }
        

        const nuevo_libro = {
          "title": titulo,
          "authorId": nuevo_objeto,
          "description": descripcion, 
          "genre": genero, 
          "publicationDate": fecha,
          "price": precio, 
          "stock": stock,
          "imageUrl": imagen,
          "averageRating": rating 
        }
        libros.push(nuevo_libro)
      }

    } else {
      res.status(500).json({error: "filtro no valido"})
    }
    res.json(libros)


  } catch (err) {
    console.error('Error al buscar libros:', err);
    res.status(500).json({ error: 'Error al buscar libros' });
  }

})
=======

>>>>>>> cf14b481d4ed7276c12f42afc086ccaaf0a02c59

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
