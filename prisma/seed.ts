import { prisma } from "@/lib/prisma.js";

async function main() {
  console.log("Iniciando seed...");

  await prisma.compra.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.vendedor.deleteMany();

  // USUÁRIOS

  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "João Silva",
      email: "joao@email.com",
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: "Maria Souza",
      email: "maria@email.com",
    },
  });

  const usuario3 = await prisma.usuario.create({
    data: {
      nome: "Pedro Santos",
      email: "pedro@email.com",
    },
  });

  const usuario4 = await prisma.usuario.create({
    data: {
      nome: "Ana Oliveira",
      email: "ana@email.com",
    },
  });

  // VENDEDORES

  const vendedor1 = await prisma.vendedor.create({
    data: {
      nome: "Carlos Eletrônicos",
      email: "carlos@loja.com",
    },
  });

  const vendedor2 = await prisma.vendedor.create({
    data: {
      nome: "Tech Store",
      email: "tech@loja.com",
    },
  });

  const vendedor3 = await prisma.vendedor.create({
    data: {
      nome: "Mundo Gamer",
      email: "gamer@loja.com",
    },
  });

  // PRODUTOS

  const produto1 = await prisma.produto.create({
    data: {
      nome: "Notebook",
      preco: 3500,
      vendedorId: vendedor1.id,
    },
  });

  const produto2 = await prisma.produto.create({
    data: {
      nome: "Mouse Gamer",
      preco: 150,
      vendedorId: vendedor3.id,
    },
  });

  const produto3 = await prisma.produto.create({
    data: {
      nome: "Teclado Mecânico",
      preco: 350,
      vendedorId: vendedor3.id,
    },
  });

  const produto4 = await prisma.produto.create({
    data: {
      nome: "Monitor 24 polegadas",
      preco: 1200,
      vendedorId: vendedor2.id,
    },
  });

  const produto5 = await prisma.produto.create({
    data: {
      nome: "Headset",
      preco: 250,
      vendedorId: vendedor2.id,
    },
  });

  // COMPRAS

  await prisma.compra.createMany({
    data: [
      // João - 3 compras
      {
        usuarioId: usuario1.id,
        produtoId: produto1.id,
      },
      {
        usuarioId: usuario1.id,
        produtoId: produto2.id,
      },
      {
        usuarioId: usuario1.id,
        produtoId: produto5.id,
      },

      // Maria - 2 compras
      {
        usuarioId: usuario2.id,
        produtoId: produto3.id,
      },
      {
        usuarioId: usuario2.id,
        produtoId: produto4.id,
      },

      // Pedro - 2 compras
      {
        usuarioId: usuario3.id,
        produtoId: produto2.id,
      },
      {
        usuarioId: usuario3.id,
        produtoId: produto5.id,
      },
    ],
  });

  console.log("Seed concluído!");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
