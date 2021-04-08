// BUILD YOUR SERVER HERE
const express = require("express");
const db = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
    db.find(req.query)
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error retrieving the users",
            })
        })
});

server.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: "User not found",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "User information can not be retrieved",
            })
        })
});

server.post("/api/users", async (req, res) => {
    const newUser = await db.insert({
        name: req.body.name,
        bio: req.body.bio,
    })

    res.json(newUser)
});

server.put("/api/user/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

    if (user) {
        const updatedUser = await db.update(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio ||user.bio,
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
});

server.delete("/api/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

    if (user) {
        await db.remove(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
