export const schema = `#graphql
	type Usuario {
    id: ID!
    nome: String!
    email: String!
		compras: [Compra!]!
  }

	type Vendedor {
    id: ID!
    nome: String!
    email: String!
		produtos: [Produto!]!
	}

	type Produto {
		id: ID!
		nome: String!
		preco: Float!
		vendedor: Vendedor!
		compras: [Compra!]!
	}

	type Compra {
		id: ID!
		data: String!
		usuario: Usuario!
		produto: Produto!
	}

  type Query {
    hello: String!
    usuarios: [Usuario!]!
		usuario(id: ID!): Usuario
		vendedores: [Vendedor!]!
		vendedor(id: ID!): Vendedor
		produtos: [Produto!]!
		produto(id: ID!): Produto
		compras: [Compra!]!
		compra(id: ID!): Compra
  }

	input CriarUsuarioInput {
		nome: String!
		email: String!
	}

	input AtualizarUsuarioInput {
		nome: String
		email: String
	}

	type Mutation {
    criarUsuario(input: CriarUsuarioInput!): Usuario!
    atualizarUsuario(id: ID!, input: AtualizarUsuarioInput!): Usuario!
    excluirUsuario(id: ID!): Usuario!
  }
`;
