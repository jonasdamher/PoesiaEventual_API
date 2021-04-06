'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const regex = require('../helpers/regex')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        match: regex.email,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        match: regex.password,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: [
          "ROLE_ADMIN"
        ],
        required: true
    }
})

const generateHashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
}

userSchema.pre('save', function(next) {
	try {
	
		let user = this
			
		if (!user.isModified('password') ) {
			return next()
		}

		user.password = generateHashPassword(user.password)
		next()
	
	}catch(error) {
		
		next(error)
	}
})

userSchema.methods.comparePassword = function(candidatePassword, hashPassword, cb) {
	
	bcrypt.compare(candidatePassword, hashPassword, function (err, isMatch) {
			
		if (err) {
			return cb(err)
		}
		cb(null, isMatch)
	
	})
}

module.exports = mongoose.model('users', userSchema)