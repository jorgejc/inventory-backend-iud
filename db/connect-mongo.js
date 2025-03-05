const mongoose = require('mongoose');


const getConnection = async () => {

    try {
        const url = 'mongodb://usuarioiud:uuqacX6oJV0kVtE9@ac-mnutzym-shard-00-00.8o3ccjs.mongodb.net:27017,ac-mnutzym-shard-00-01.8o3ccjs.mongodb.net:27017,ac-mnutzym-shard-00-02.8o3ccjs.mongodb.net:27017/?ssl=true&replicaSet=atlas-147jrs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=test-cluster';
        
        // 'mongodb+srv://usuarioiud:uuqacX6oJV0kVtE9@ac@test-cluster.8o3ccjs.mongodb.net/ing-web-inv?retryWrites=true&w=majority&appName=test-cluster'


        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch(error) {
        console.log(error);   
    }
}
    
    module.exports = {
        getConnection,
    }

