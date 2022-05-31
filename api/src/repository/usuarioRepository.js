import {Conexao} from './connection.js'

export async function login(email, senha) {
    const comando = 
    `select id_usuario  id,
    nm_usuario		    nome,
    ds_email			email
    from tb_usuario
    where ds_email 		= ?
    and ds_senha		= ?`
    const [linhas] = await Conexao.query(comando, [email, senha])
    return linhas[0];
}

export async function inserirfilme(filme){
    const comando=`INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
    VALUES (?, ?, ?, ?, ?, ?);
`
    const [resposta]= await Conexao.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel])
    filme.id= resposta.insertId;

    return filme
}
