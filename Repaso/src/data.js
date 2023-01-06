let users = [
    {
        id: 1,
        name: "Facundo",
        lastname: "Tombesi",
        email: "ftombesi@gmail.com"
    },
    {
        id: 2,
        name: "Milagros",
        lastname: "Tombesi",
        email: "mtombesi@gmail.com"
    },
    {
        id: 3,
        name: "Pablo",
        lastname: "Tombesi",
        email: "ptombesi@gmail.com"
    },
    {
        id: 4,
        name: "Silvana",
        lastname: "Piccinini",
        email: "spiccinini@gmail.com"
    }
]

let posts = [
    {
        id: 1,
        title: "Repaso M3",
        contents: "Repaso de Express",
        userId: 1
    },
    {
        id: 2,
        title: "Inventario Farmacia",
        contents: "Revisar el inventario y realizar pedidos a droguería",
        userId: 3
    }
]

module.exports = { users, posts }