import { Injectable } from '@nestjs/common';
import OpenAI from "openai";

const client = new OpenAI();

@Injectable()
export default class SummaryService {


    async summarizeText(text: string): Promise<string> {
        const padraoResposta = "Você receberá a transcrição completa de um áudio. Sua tarefa é criar um material didático organizado e fiel, **sem adicionar, resumir ou omitir nenhuma informação** do conteúdo original. Siga as instruções abaixo: 1. Inicie com um breve resumo do conteúdo em até 10 linhas. 2. Em seguida, apresente **todo o conteúdo da transcrição de forma organizada**, dividida por tópicos e subtópicos quando necessário. 3. Mantenha a **linguagem acessível e clara**, adequada para jovens de 14 a 18 anos. 4. Use **Markdown** para formatar o texto: títulos, subtítulos e listas. 5. Não adicione comentários, ícones ou conteúdo decorativo. 6. **Não invente nem reescreva com outras palavras**: apenas reorganize o conteúdo mantendo todas as ideias e exemplos originais. Sua resposta deve conter apenas o conteúdo em Markdown formatado corretamente. ";
        console.log('Passando instruções...');
        const response = await client.responses.create({
            model: "gpt-4.1",
            instructions: padraoResposta,
            input: text,
        });

        console.log(response.output_text);
        return response.output_text;

    }
}