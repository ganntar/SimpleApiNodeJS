const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const {id} = request.params;
        const [livros] = await connection('livros')
                                .select('*')
                                .where('id', id);

        if(livros == undefined){
            return response.json('Id não cadastrado!')
        }

        return response.json(livros);
    },

    async create(request, response){
        const {titulo,
            isbn,
            autor,
            editora,
            ano,
            idioma,
            peso,
            comprimento,
            largura,
            altura} = request.body;
     
        const id = crypto.randomBytes(32).toString('HEX');
    
        await connection('livros').insert({
            id,
            titulo,
            isbn,
            autor,
            editora,
            ano,
            idioma,
            peso,
            comprimento,
            largura,
            altura
        })
    
        return response.json({id,
            titulo,
            isbn,
            autor,
            editora,
            ano,
            idioma,
            peso,
            comprimento,
            largura,
            altura})
    },

    async delete(request, response){
        const { id } = request.params;

        const livro = await connection('livros')
                                    .where('id', id)
                                    .select('*')
                                    .first();

        if(livro.id != id){
            return response.status(401).json('Id não cadastrado!');
        }
        await connection('livros').where('id', id).delete();

        return response.status(200).json(livro)

    },

    async update(request, response){
        const { id } = request.params;

        const {titulo,
                isbn,
                autor,
                editora,
                ano,
                idioma,
                peso,
                comprimento,
                largura,
                altura} = request.body;

        const livroId = await connection('livros')
                                    .where('id', id)
                                    .select('id')
                                    .first();

        if(!livroId){
            return response.status(401).json('Id não cadastrado!');
        }

        await connection('livros')
                .where('id', id)
                .update({
                    titulo: titulo,
                    isbn: isbn,
                    autor: autor,
                    editora: editora,
                    ano: ano,
                    idioma: idioma,
                    peso: peso,
                    comprimento: comprimento,
                    largura: largura,
                    altura: altura
                });

        return response.status(200).json()

    }

    
}