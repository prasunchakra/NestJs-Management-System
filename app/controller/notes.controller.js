const Note = require('../model/note.model');

exports.create = (req,res)=>{

    if (!req.body.content){
        return res.status(400).send({
            message:"Note content cannot be empyty"
        })
    }

    if (!req.body.title){
        return res.status(400).send({
            message:"Note must have a title"
        })
    }

    const note = new Note({
        title:req.body.title,
        content:req.body.content
    }); 

    note.save()
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send({
            message:err.message || " Error Occured"
        });
    });
};

exports.getAll = (req,res)=>{

    Note.find()
    .then(notes =>{
        res.send(notes);
    }).catch(err=>{
        res.status(500).send({
            message:err.message ||" Error Occured"
        });
    });


};

exports.findOne = (req,res)=>{
    Note.findById(req.params.noteId)
    .then(note =>{
        if(!note){
            return res.status(404).send({
                message:"Note not found with Id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err=>{
        return res.status(500).send({
                message:"Error Retrieving Note with Id " + req.params.noteId
            });        
    })

};

exports.update = (req,res)=>{

    if (!req.body.content){
        return res.status(400).send({
            message:"Note content cannot be empyty"
        })
    }

    if (!req.body.title){
        return res.status(400).send({
            message:"Note must have a title"
        })
    }
    Note.findByIdAndUpdate(req.params.noteId,{
        title:req.body.title,
        content: req.body.content
    },{new:true})   // The {new: true} option is used to return the modified document to the then() function instead of the original.
    .then(note=>{
        if (!note){
            return res.status(404).send({
                message:"Not found note with Id "+req.params.noteId
            })
        }
        res.send(note);
    }).catch(err=>{
        return res.status(500).send({
            message : "Error updating note with Id "+req.params.noteId
        });
    });
};

exports.delete = (req,res)=>{
    Note.findByIdAndRemove(req.params.noteId)
    .then(note=>{
        if (!note){
            return res.status(404).send({
                message:"Not found note with Id "+req.params.noteId
            })
        }
        res.send({message:"Note Deleted Successfully"});
    }).catch(err=>{
        return res.status(500).send({
            message : "Error deleting note with Id "+req.params.noteId
        });
    });
};

