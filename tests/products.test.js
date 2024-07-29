const request = require('supertest');
const app = require('../src/index');

describe('API de Produtos', () => {
  let servidor;
  let idProduto;

  beforeAll((done) => {
    servidor = app.listen(4000, done); // Usar uma porta diferente para os testes
  });

  afterAll((done) => {
    servidor.close(done);
  });

  it('deve criar um novo produto', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        nome: 'Produto de Teste',
        preco: 10
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    idProduto = res.body.id;
  });

  it('deve buscar todos os produtos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve buscar um produto específico por ID', async () => {
    const res = await request(app).get(`/api/products/${idProduto}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', idProduto);
  });

  it('deve atualizar um produto existente', async () => {
    const res = await request(app)
      .put(`/api/products/${idProduto}`)
      .send({
        nome: 'Produto Atualizado',
        preco: 20
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome', 'Produto Atualizado');
  });

  it('deve deletar um produto existente', async () => {
    const res = await request(app).delete(`/api/products/${idProduto}`);
    expect(res.statusCode).toEqual(204);
  });

  it('deve retornar 404 quando o produto não for encontrado', async () => {
    const res = await request(app).get(`/api/products/${idProduto}`);
    expect(res.statusCode).toEqual(404);
  });
});
