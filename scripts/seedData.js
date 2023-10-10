const mongoose = require('mongoose');
const { User, Product, Order } = require('../src/models');

const seedData = async () => {
  try {
    // Conexión a la base de datos
    await mongoose.connect('mongodb://localhost:27017/tu_basededatos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    // Limpia las colecciones existentes
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // Crea usuarios
    const user1 = await User.create({ name: 'Usuario 1', email: 'user1@example.com', password: 'password1' });
    const user2 = await User.create({ name: 'Usuario 2', email: 'user2@example.com', password: 'password2' });

    // Crea productos
    const product1 = await Product.create({ name: 'Producto 1', price: 10.99 });
    const product2 = await Product.create({ name: 'Producto 2', price: 15.99 });

    // Crea una orden con productos para un usuario
    const order = await Order.create({
      products: [product1._id, product2._id],
      totalPrice: product1.price + product2.price,
      user: user1._id
    });

    console.log('Datos de prueba insertados con éxito.');
  } catch (error) {
    console.error('Error al insertar datos de prueba:', error);
  } finally {
    // Cierra la conexión a la base de datos
    mongoose.connection.close();
  }
};

seedData();