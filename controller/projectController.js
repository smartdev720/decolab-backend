const Project = require('../models/project');

exports.create = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        if(!newProject) {
            return res.status(404).json({message: 'Project not found'});
        }
        await newProject.save();
        return res.status(201).json({message: 'Project created successfully'});
    }catch(err) {
        return res.status(500).json({message: 'Server error', err});
    }
}

exports.getMe = async (req, res) => {
    const userId = req.user.id;
    try {
        const projects = await Project.find({userId: userId});
        res.status(200).json(projects);
    }catch(err) {
        return res.status(500).json({message: 'Server error', err});
    }
}

exports.getByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const projects = await Project.find({userId: userId});
        return res.status(200).json(projects);
    }catch(err) {
        return res.status(500).json({message: 'Server error', err});
    }
}

exports.update = async (req, res) => {
    const {id} = req.params;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if(!updatedProject) {
            return res.status(404).json({message: 'Project not found'});
        }
        return res.json(updatedProject);
    }catch(err) {
        return res.status(500).json({message: 'Server error', err});
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if(!deletedProject) {
            return res.status(404).json({message: 'Project not found'});
        }
        return res.status(200).json({message: 'Project deleted successfully'});
    }catch(err) {
        return res.status(500).json({message: 'Server error', err});
    }
}