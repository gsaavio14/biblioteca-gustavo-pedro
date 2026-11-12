import { Controller, Get, Render } from '@nestjs/common';
import { LivroService } from './livro.service';
import { helpers } from './livro.view.helpers';

@Controller('livros')
export class LivroController {

    constructor(private readonly livroService: LivroService) {}

    @Get()
    @Render('livro/index')
    async getAll(): Promise<object> {
        let livros = await this.livroService.findAll();

        return { titulo: 'Livros', listaLivros: livros, _h: helpers };
    }
}