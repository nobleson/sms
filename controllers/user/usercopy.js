
// Get Data Models
const User = require('models/user/User')
var FileSaver = require('file-saver');
const uuidv4 = require('uuid/v4')
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');


/* exports.create = (req, res) => {
    // Validate request
    //console.log("tracking data:  "+JSON.stringify(req.body));

    const face = new Face(req.body);
    var data = face.faceData
    var uuid4 = uuidv4()    

    var imageName = uuid4 +".png"
    let baseDir = path.join(__dirname, '../public/assets/fileserver/'+imageName);
    var base64Data = data.replace(/^data:image\/png;base64,/, "");


    fs.writeFile(baseDir, base64Data,'base64', (err) => {
    console.log('data saved',data);
    if (err) throw err;               
    console.log(err); 
    }) 

    face.faceData = imageName
    face.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the face."
        });
    });
}; */



exports.create = async (req, res) => {
    
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        console.log('token',JSON.stringify(token))

        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send({
            message: error.message || "Some error occurred while creating the User."
        })
    }
};
exports.login = async (req, res) => {
    
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User."
        });
    });
};
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
 
    const id = req.params.userId
    const art = req.body
    const { ...updateData } = art
    User.findByIdAndUpdate(id,updateData,{new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.userId
        });
    });
};
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
};
/* exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        var fileName = face.faceData
        console.log('deleted file',fileName);

        let baseDir = path.join(__dirname, '../public/assets/fileserver/'+fileName);
        fs.unlink(baseDir, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 

        res.send({message: "Face deleted successfully!",status: 200});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Face not found with id " + req.params.faceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.faceId
        });
    });
}; */