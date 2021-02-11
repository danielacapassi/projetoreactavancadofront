import { useState, useEffect, lazy, Suspense } from "react";
import { Container, Row, ListGroup } from "react-bootstrap";

/* import Produto from "../Components/Produto";
import ListarCategoria from "../Components/ListarCategoria"; */

const Produto = lazy(()=>import("../Components/Produto"))
const ListarCategoria = lazy(()=>import("../Components/ListarCategoria"))



export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [filtrar, setFiltrar] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  const filtro = (categoriaFiltro) => {
    console.log("Vou aplicar o filtro: " + categoriaFiltro);
    setFiltrar(categoriaFiltro);
  };

  useEffect(async () => {
    const resposta = await fetch("http://localhost:3333/produtos");
    const dados = await resposta.json();
    console.log(dados);
    setProdutos(dados);
    setProdutosFiltrados(dados);
  }, []);

  useEffect(() => {
    console.log("alterou o filtro");

    let listaTempProdutosFiltrados = [];

    if (filtrar === "todos") {
      setProdutosFiltrados(produtos);
    } else {
      produtos.map((produto) => {
        if (produto.categoria === filtrar) {
          listaTempProdutosFiltrados.push(produto);
        }
      });

      setProdutosFiltrados(listaTempProdutosFiltrados);
    }
  }, [filtrar]);

  return (
    <div className="col-sm-12 mx-auto">
      <h1>
        <b>Nossos Produtos:</b>
      </h1>
      {produtos && (
        <Suspense fallback={<p>Carregando....</p>}>
        <ListarCategoria funcaoFiltro={filtro} listaProdutos={produtos} />
        </Suspense>
      )}
      <br /> <br />
      <Container>
        <Row>
          {produtosFiltrados &&
            produtosFiltrados.map((item) => (
              <Suspense key={item.idproduto} fallback={<p>Carregando....</p>}>
              <Produto
                key={item.idproduto}
                box_imagens={`${item.imagem}`}
                descricao={item.descricao}
                descricao2={item.preco}
                precofinal={item.precofinal}
                categoria={item.categoria}
              />
              </Suspense>
            ))}
        </Row>
      </Container>
    </div>
  );
}
