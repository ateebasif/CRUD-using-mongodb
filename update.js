
async function update() {

    let name = 'hamza'
    console.log(name);
    // const user = await Model.findById('5d283dba06c5614670aaf1cf');
    const user = await Model.findById('5d283dba06c5614670aaf1cf');
    user.name = 'salman';
    result = await user.save();
    console.log(result);
}
update();



// you can update by finding by name or any other field btu it will not print out the result

const user = await Model.update({name: 'salman'}, {
    $set: {
        name: 'hassan'
    }
});

console.log(user);


// find by id and update and displays the updated document

let id = '5d283dba06c5614670aaf1cf';
const user = await Model.findByIdAndUpdate(id, {
    $set: {
        name: 'Hamza'
    }
}, {new: true});

console.log(user);


// like this you can find a user by its name and then you can update it by using its ID

const user = await Model.find({name: 'hassan'});
let uid = user[0].id
// console.log(uid);

const nuser = await Model.findByIdAndUpdate(uid, {
    $set: {
        name: 'hassan',
        age: 24
    }
}, {new: true});
console.log(nuser);