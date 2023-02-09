const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Method 1 : Using Async Await
const newRecepie = 
  {title: 'Bacalhau',
  level: 'Easy Peasy',
  ingredients: ['fish'],
  cuisine: 'Portugues',
  dishType: 'main_course',
  duration: 20,
  creator: 'me'}

  
  
  
  
  
  const manageRecipes = async () => {
    try {
      // Connection to the database "recipe-app"
      const dbConnection = await mongoose.connect(MONGODB_URI);
      console.log(`Connected to the database: "${dbConnection.connection.name}"`);
      
      // Before adding any recipes to the database, let's remove all existing ones
      await Recipe.deleteMany();
      
      await Recipe.create(newRecepie);
      console.log (newRecepie.title)

      await Recipe.insertMany(data)

      data.forEach(element => {
        console.log(element.title)
      });
      

      await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100 })
      console.log('yeaaah')


      await Recipe.deleteOne({title: 'Carrot Cake'})
      console.log('ohhhhh yeaaaaahhhh')

      mongoose.disconnect();

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
