const mongoose = require ('mongoose');

const projectSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    projectName: {type: String, required: true},
    description: {type: String, required: true},
    stage: {type: String, required: true},
    blockchainDetails: {
        blockchain: {type: String, default: ''},
        tokenSymbol: {type: String, default: ''},
        smartContractAddress: {type: String, default: ''}
    },
    socialLinks: {
        twitter: {type: String, default: ''},
        github: {type: String, default: ''},
        telegram: {type: String, default: ''},
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);