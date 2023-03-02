const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let motorista = await prisma.motorista.create({
        data: req.body
    });

    res.status(200).json(motorista).end();
}

const createItems = async (req, res) => {
    let motorista = await prisma.motorista.createMany({
        data: [
            {
                nome: "Fiuk Carlos",
                CNH: 17663523146,
                disponivel: "Indisponível",    
            },
            {
                nome: "Selena Gomes",
                CNH: 46293543404,
                disponivel: "Indisponível",
            },
            {
                nome: "Luciano Hulk",
                CNH: 08279424413,
                disponivel: "Indisponível",
            },

        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(motorista).end();

}

const readOne = async (req, res) => {
    let motorista = await prisma.motorista.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            nome: true,
            CNH: true,
            disponivel: true,
            operacao: true,
        }
    });

    //SELECT * FROM motorista INNER JOIN publicacao ON motorista.id = publicacao.motorista_id WHERE ....

    res.status(200).json(motorista).end();
}

const read = async (req, res) => {
    let motoristas = await prisma.motorista.findMany({
    });

    //SELECT email, nome FROM motorista WHERE email = ''

    res.status(200).json(motoristas).end();
}

const update = async (req, res) => {
    const motorista = await prisma.motorista.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(motorista).end();
}

const remove = async (req, res) => {
    const motorista = await prisma.motorista.delete({
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(200).json(motorista).end();
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove,
    createItems
    
}