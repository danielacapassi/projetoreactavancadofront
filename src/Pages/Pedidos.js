import { useState, useEffect, lazy, Suspense } from "react";
/* import Pedido from  "../Components/Pedidos";
 */
const Pedido = lazy (()=> import("../Components/Pedidos"))

export default function Pedidos() {
  const [pedidos, setPedidos] = useState("");

  let idCliente = 3;

  useEffect(async () => {
    const resposta = await fetch(`http://localhost:3333/pedidos/${idCliente}`);
    const dados = await resposta.json();
    console.log(dados);
    setPedidos(dados);
  }, []);

  return (
    <div className="col-sm-12 mx-auto">
      <h1>
        <b>{`Histórico de Pedidos do Cliente: ${
          pedidos && pedidos[0].nome
        }`}</b>
      </h1>

      {pedidos &&
        pedidos.map((item) => (
          <Suspense fallback={<p>Carregando...</p>}>
          <Pedido key={item.idpedido} idpedido={item.idpedido} data={item.data} descricao={item.descricao} precofinal={item.precofinal} />
          </Suspense>
        ))}
    </div>
  );
}
 