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
                statusMotorista: "sim"
            },
            {
                nome: "Selena Gomes",
                CNH: 46293543404,
                disponivel: "Indisponível",
                statusMotorista: "sim"
            },
            {
                nome: "Luciano Hulk",
                CNH: 08279424413,
                disponivel: "Indisponível",
                statusMotorista: "sim"
            },
            {
                nome: "Robert Pertenson",
                CNH: 05354335223,
                disponivel: "Disponível",
                statusMotorista: "nao"
            },
            {
                nome: "Maria Fernanda",
                CNH: 93828373212,
                disponivel: "Disponível",
                statusMotorista: "sim"
            },
            {
                nome: "José da Silva",
                CNH: 87364846283,
                disponivel: "Disponível",
                statusMotorista: "nao"
            },
            {
                nome: "Carla Souza",
                CNH: 72636482930,
                disponivel: "Disponível",
                statusMotorista: "sim"
            },
            {
                nome: "Lucas Oliveira",
                CNH: 21938463829,
                disponivel: "Disponível",
                statusMotorista: "nao"
            },
            {
                nome: "Mariana Santos",
                CNH: 36573892733,
                disponivel: "Disponível",
                statusMotorista: "sim"
            },
            {
                nome: "Pedro Henrique",
                CNH: 29485736288,
                disponivel: "Disponível",
                statusMotorista: "nao"
            },
            {
                nome: "Fernanda Silva",
                CNH: 73629384723,
                disponivel: "Disponível",
                statusMotorista: "sim"
            },
            {
                nome: "Roberto Souza",
                CNH: 19483726372,
                disponivel: "Disponível",
                statusMotorista: "nao"
            },
            {
                nome: "Luana Oliveira",
                CNH: 36283746371,
                disponivel: "Disponível",
                statusMotorista: "sim"
            },
            {
                nome: "Ricardo Nunes",
                CNH: 85739273621,
                disponivel: "Disponível",
                statusMotorista: "nao"
            },
            {
                nome: "Mariana Costa",
                CNH: 93287465263,
                disponivel: "Disponível",
                statusMotorista: "sim"
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