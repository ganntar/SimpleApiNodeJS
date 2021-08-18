const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const filtro = request.query;

        const livros = await connection('livros')
                                .where((qb) => {
                                    if(filtro.busca){
                                        qb.where('titulo','like',filtro.busca)
                                        .orWhere('autor','like',filtro.busca)
                                        .orWhere('isbn','like',filtro.busca)
                                        if(filtro.anoInicial){
                                            qb.orWhere('ano','>=',Number(filtro.anoInicial))
                                        }
                                        if(filtro.anoFinal){
                                            qb.andWhere('ano','<=',Number(filtro.anoFinal))
                                        }
                                    }
                                    if(filtro.anoInicial && (!filtro.busca)){
                                        qb.where('ano','>=',Number(filtro.anoInicial))
                                        if(filtro.anoFinal){
                                            qb.andWhere('ano','<=',Number(filtro.anoFinal))
                                        }
                                        
                                    }
                                })
                                .select('id','titulo','isbn','autor','editora','ano')
                                .limit(filtro.maxresultcount)
                                
        
        const itens = {"itens": livros, "totalCount": livros.length}
        return response.json(itens);
    }
}