const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let veiculos = await prisma.veiculos.create({
        data: req.body
    });

    res.status(200).json(veiculos).end();
}

const createItems = async (req, res) => {
    let veiculos = await prisma.veiculos.createMany({
        data: [
            {
                placa: "IPR-2270",
                modelo: "Truck",
                marca: "Hyundai",
                tipo: "Venda",
                status: "Indisponível",
            },
            {
                placa: "IBY-9612",
                modelo: "Truck",
                marca: "Iveco",
                tipo: "Carga",
                status: "Indisponível",
            },
            {
                placa: "AJV-3745",
                modelo: "Truck",
                marca: "Iveco",
                tipo: "Carga",
                status: "Indisponível",
            },
            {
                placa: "AHY-6798",
                modelo: "Carro",
                marca: "Honda",
                tipo: "Visita",
                status: "Indisponível",
            },
            {
                placa: "HYA-1235",
                modelo: "Carro",
                marca: "Fiat",
                tipo: "Visita",
                status: "Disponível",
            },
            {
                placa: "YIO-5323",
                modelo: "Carro",
                marca: "Honda",
                tipo: "Venda",
                status: "Disponível",
            },
            {
                placa: "ABC-1234",
                modelo: "Carro",
                marca: "Yamaha",
                tipo: "Venda",
                status: "Disponível",
            },
            {
                placa: "DEF-5678",
                modelo: "Carro",
                marca: "Ford",
                tipo: "Visita",
                status: "Disponível",
            },
            {
                placa: "GHI-9101",
                modelo: "Caminhão",
                marca: "Volvo",
                tipo: "Carga",
                status: "Disponível",
            },
            {
                placa: "JKL-2345",
                modelo: "Carro",
                marca: "Fiat",
                tipo: "Venda",
                status: "Disponível",
            },
            {
                placa: "MNO-6789",
                modelo: "Caminhão",
                marca: "Honda",
                tipo: "Carga",
                status: "Disponível",
            },
            {
                placa: "PQR-1112",
                modelo: "Carro",
                marca: "Chevrolet",
                tipo: "Venda",
                status: "Disponível",
            },


        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(veiculos).end();

}

const readOne = async (req, res) => {
    let veiculos = await prisma.veiculos.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            placa: true,
            modelo: true,
            marca: true,
            tipo: true,
            operacao: true,
            manutencao: true
        }
    });

    //SELECT * FROM veiculos INNER JOIN publicacao ON veiculos.id = publicacao.veiculos_id WHERE ....

    res.status(200).json(veiculos).end();
}

const read = async (req, res) => {
    let veiculos = await prisma.veiculos.findMany({
    });

    //SELECT email, nome FROM veiculos WHERE email = ''

    res.status(200).json(veiculos).end();
}

const update = async (req, res) => {
    const veiculos = await prisma.veiculos.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(veiculos).end();
}

const remove = async (req, res) => {
    const veiculos = await prisma.veiculos.delete({
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(200).json(veiculos).end();
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove,
    createItems

}