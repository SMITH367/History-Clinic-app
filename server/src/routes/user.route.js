const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexionMysql = require('../database')
const query = require('../models/querys')
const verifyToken = require('../Auth/verifyToken')
//Login sistem
router.post('/login', async (req, res) => {

    const userData = conexionMysql.query(query.selectUserByid, req.body.email, (err, rows, fields) => {
        if (err) res.send(err)
        else {
            if (rows.length > 0) {
                const passwordUser = rows[0].password
                const passwordTry = req.body.password

                const passwordValidation = bcryptjs.compareSync(passwordTry, passwordUser)

                if (passwordValidation) {

                    const user = {
                        user:rows[0].id
                    }
                    jwt.sign({
                     user   
                    }, 'secretKey', (err, token) => {

                        if (err) return err

                        const dataUser = {
                            name: rows[0].name,
                            email: rows[0].email,
                            accessToken: token
                        }

                        res.json(dataUser);

                    })
                } else {
                    res.sendStatus(403)
                }
            }

        }
    })
})
router.post('/register', async (req, res) => {


    let passwordHash = await bcryptjs.hash(req.body.password, 8)

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash
    }

    conexionMysql.query(query.saveUser, [data], (err, rows, fields) => {
        if (err) res.send(err)
        else {
            res.json({
                "User added": true
            });
        }
    })
})
router.get('/user',verifyToken, async (req, res) => {
   res.send("AUTHORIZATED")
})


module.exports = router;