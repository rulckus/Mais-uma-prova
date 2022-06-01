import { Conexao } from "./connection.js";


export async function inserirfilme(filme) {
    const comando = `INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
    VALUES (?, ?, ?, ?, ?, ?);
`
    const [resposta] = await Conexao.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel])
    filme.id = resposta.insertId;

    return filme
}



export async function alterarImagem(imagem, id) {
    const comando =
        `UPDATE tb_filme
        SET img_filme   = ? 
        WHERE id_filme =  ?`;

    const [resposta] = await Conexao.query(comando, [imagem, id]);
    return resposta.affectedRows;

}

export async function ListarTodosOsFilmes() {
    const comando = `SELECT 
    id_filme			          id,
    nm_filme			        nome,
    vl_avaliacao	      avaliacao,
    dt_lancamento	      lancamento,
    bt_disponivel	      disponivel
  FROM tb_filme`
    const [linhas] = await Conexao.query(comando)
    return linhas
}

export async function BuscarPorNome(nome) {
    const comando = `SELECT 
    id_filme			     id,
    nm_filme			    nome,
    vl_avaliacao	        avaliacao,
    dt_lancamento	        lancamento,
    bt_disponivel	        disponivel
    FROM  tb_filme
    WHERE nm_filme like ? `;
    const [linhas] = await Conexao.query(comando, [`%${nome}%`]);
    return linhas;
}

export async function BuscarPorID(id) {
    const comando = `SELECT 
    id_filme			id,
    nm_filme			nome,
    ds_sinopse          sinopse,
    img_filme           imagem,
    vl_avaliacao	      avaliacao,
    dt_lancamento	      lancamento,
    bt_disponivel	      disponivel
    FROM  tb_filme
    WHERE id_filme = ? `;
    const [linhas] = await Conexao.query(comando, [id]);
    return linhas[0];
}
