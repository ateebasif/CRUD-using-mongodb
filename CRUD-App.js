let express = require('express');
let app = express();
let port = process.env.Port || 3000;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// including mongoose


mongoose.connect('mongodb://localhost/signup')
    .then(function() { console.log('DB connected'); })
    .catch(function(err) { console.error('could not connect to the database'); });

const formschema = new mongoose.Schema ({
    name: String,
    age: Number,
    email: String
});

const Model = mongoose.model('signed-ups', formschema);

// using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());

app.get('/',function(req,res){
    res.sendFile(__dirname + '/form.html');
});

app.post('/signup', function(req,res){

    let name = req.body.name;
    let age = req.body.age;
    let email = req.body.email;

    res.send('name= ' + name + ' age= ' + age+ ' email= ' +email);
    console.log('name= ' + name + ' age= ' + age+ ' email= ' +email);

    async function signup(){

        const user = new Model ({

            name: name,
            age: age,
            email: email

        });

        const result = await user.save();

        console.log(result);
    }

    signup();
});

app.get('/find/:name',function(req,res){

    async function findUser() {

        const user = await Model.find({name: req.params.name});
        res.send(user);
        console.log(user);
    }

    findUser();
});

app.get('/update/:name', function(req,res){

    async function update() {

        let name = req.params.name;
        console.log(name);

        const user = await Model.find({name: name});
        let id = user[0].id;

        const nuser = await Model.findByIdAndUpdate(id, {
            $set: {
                name: 'arbi',
                age: 22
            }
        }, {new: true});
        
        console.log(nuser);
        res.send(nuser);
    }
    update();
});


app.get('/delete/:name', function(req,res){

    async function del() {

        let name = req.params.name;
        const user = await Model.find({name: name});
        let id = user[0].id;
        const nuser = await Model.findByIdAndRemove(id);
        console.log(nuser);
        res.send(nuser);
    }

    del();

});



app.listen(port,function(){
    console.log('Listening on port 3000');
});