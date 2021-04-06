'use strict';

const USER = require('../models/user-model')
const authJWT = require('../helpers/jwt')

module.exports = {
    login,
    signup,
    refreshToken,
    update
}

async function login(req, res) {

    if (req.body.password && req.body.email) {
        
        USER.findOne({email: req.body.email})
        .select("_id password role name email")
        .exec((err, user) => {

                if (err || !user) {
                    return res.status(401).json({ error: "User does not exist" })
                }

                user.comparePassword(req.body.password, user.password, function (err, isMatch) {
        
                    if (isMatch & !err) {
                        
                        let dataToken = authJWT.createToken(user)
                        
                        let userResponse = {
                            access_token: dataToken[0],
                            refresh_token: authJWT.createRefreshToken(user),
                            expires_in: dataToken[1],
                            role: user.role,
                            user: {
                                name: user.name,
                                email: user.email,
                                _id: user.id
                            }
                        }

                        return res.status(200).json(userResponse)

                    } else {
                        return res.status(401).json({ error: "Password or Email Invalid" })
                    }
                })

            })
    } else {
        return res.status(401).json({ error: "BadRequest" })
    }
}

async function signup(req, res) {

    USER.create(req.body).then(user => {
            
        let dataToken = authJWT.createToken(user)

        let userResponse = {
            access_token: dataToken[0],
            refresh_token: authJWT.createRefreshToken(user),
            expires_in: dataToken[1],
            role: user.role,
            user: {
                name: user.name,
                email: user.email,
                _id: user.id
            }
        }
        
        return res.status(201).json(userResponse)

    }).catch(err => {
          
        console.log(err)
        return res.status(400).json(err)
    })
}

async function refreshToken(req, res) {
    authJWT.refreshToken(req, res)
}

async function update(req, res) {

    USER.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(userResponse => {
            
        return res.status(200).json(userResponse)

    }).catch(err => {
        
        console.log(err)
        return res.status(400).json(err)
    })
}