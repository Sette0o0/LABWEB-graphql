import type {
  Compra,
  Produto,
  Usuario,
  Vendedor,
} from "@/generated/prisma/client.js";
import { prisma } from "@/lib/prisma.js";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello GraphQL!";
    },

    usuarios: () => prisma.usuario.findMany(),
    usuario: (_: unknown, args: { id: string }) =>
      prisma.usuario.findUnique({ where: { id: Number(args.id) } }),

    vendedores: () => prisma.vendedor.findMany(),
    vendedor: (_: unknown, args: { id: string }) =>
      prisma.vendedor.findUnique({ where: { id: Number(args.id) } }),

    produtos: () => prisma.produto.findMany(),
    produto: (_: unknown, args: { id: string }) =>
      prisma.produto.findUnique({ where: { id: Number(args.id) } }),

    compras: () => prisma.compra.findMany(),
    compra: (_: unknown, args: { id: string }) =>
      prisma.compra.findUnique({ where: { id: Number(args.id) } }),
  },

  Mutation: {
    criarUsuario: (
      _: unknown,
      args: {
        input: {
          nome: string;
          email: string;
        };
      },
    ) => {
      return prisma.usuario.create({
        data: {
          nome: args.input.nome,
          email: args.input.email,
        },
      });
    },

    atualizarUsuario: (
      _: unknown,
      args: {
        id: string;
        input: {
          nome?: string;
          email?: string;
        };
      },
    ) => {
      return prisma.usuario.update({
        where: {
          id: Number(args.id),
        },

        data: args.input,
      });
    },

    excluirUsuario: (_: unknown, args: { id: string }) => {
      return prisma.usuario.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },

  Usuario: {
    compras: (usuario: Usuario) => {
      return prisma.compra.findMany({
        where: { usuarioId: usuario.id },
      });
    },
  },

  Vendedor: {
    produtos: (vendedor: Vendedor) => {
      return prisma.produto.findMany({
        where: { vendedorId: vendedor.id },
      });
    },
  },

  Compra: {
    data: (compra: Compra) => compra.data.toISOString(),
    produto: (compra: Compra) => {
      return prisma.produto.findUnique({ where: { id: compra.produtoId } });
    },
    usuario: (compra: Compra) => {
      return prisma.usuario.findUnique({ where: { id: compra.usuarioId } });
    },
  },

  Produto: {
    vendedor: (produto: Produto) => {
      return prisma.vendedor.findUnique({ where: { id: produto.vendedorId } });
    },
    compras: (produto: Produto) => {
      return prisma.compra.findMany({
        where: { produtoId: produto.id },
      });
    },
  },
};
