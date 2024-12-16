# Digest It - Automação para CI/CD e Gerenciamento de Conteúdo

**Digest It** é um módulo NPM que integra pipelines personalizados, automação de conteúdo e suporte a ferramentas como GitHub Actions, Netlify e ChatGPT.

[](https://github.com/Edu4Dev/digest-it)

Em um processo de pipeline tradicional, os dados fluem de uma fase para outra de maneira linear e predefinida. Porém, o que diferencia nossa abordagem é a customização dinâmica.

Em vez de seguir um fluxo rígido, como uma esteira fixa, nós oferecemos a possibilidade de escolher eventos, tarefas ou processos a serem aplicados em cada fase, permitindo ao desenvolvedor ou usuário personalizar sua jornada de dados com base nas necessidades do momento.

# ✨ **Recursos Principais**

✅ **Escalabilidade Modular**: Baseado em classes configuráveis e seguras.  
✅ **Configuração Simples**: Arquivos YAML/JSON centralizam todas as configurações.  
✅ **Retry Automático**: Sistema robusto de tentativa para evitar falhas.  
✅ **Geração de Sitemaps e Feeds**: Indexação otimizada de conteúdos.  
✅ **Paralelismo**: Gera arquivos estáticos de forma assíncrona e rápida.  
✅ **Logs Detalhados**: Monitoramento com debug configurável.  
✅ **Extensível**: Adicione novos componentes sem quebrar o fluxo.

## Fluxo do Pipe

```
flowchart TD
    Start([🚀 Início da Pipeline])
    InitPipe([🔑 Etapa Inicial])
    FileSetup([📂 Configuração de Arquivos])
    PromptProcessing([🧠 Processamento de Prompts])
    StaticFiles([📝 Geração de Arquivos Estáticos])
    FinalStep([🏁 Etapa Final])
    End([✅ Conclusão])

    Start --> InitPipe
    InitPipe --> FileSetup
    FileSetup --> PromptProcessing
    PromptProcessing --> StaticFiles
    StaticFiles --> FinalStep
    FinalStep --> End
```

---

# 🚦 **Uso**

## **Inicialização da Pipeline**

```javascript
const DigestPipeline = require("./main");
const pipeline = new DigestPipeline(
  userConfigs, // Configurações do usuário
  userPaths, // Caminhos de arquivos
  userKeys, // Chaves de API
  autoPost, // Automação de postagem (boolean)
  userDebug // Debug (boolean)
);

pipeline.run();
```

---

# Quando Você Deve Usar Isso?

**Digest It** é ideal nas seguintes situações:

1. **Automação de Conteúdo**: Geração de sitemaps, feeds RSS/Atom, e organização de arquivos estáticos.
2. **Integração de IA**: Fluxos automatizados para criação de conteúdo com AI ChatGPT.
3. **Sincronização**: Sincronia de pastas de arquivos públicos e estáticos em projetos.
4. **Gerenciamento de Workflows**: Simplifique e otimize pipelines no GitHub Actions.
5. **Agendamento de Tarefas**: Automatize atualizações e publicações de conteúdo.

# Estrutura de Pipeline

## **Pre-Build Sync Pipeline**

1. Captura de Dados via arquivos Markdown;
2. ~Captura de Dados via API~;
3. ~Sincronização em Tempo Real~;
4. ~Data API Websocket~;
5. Criação de JSON com dados captados.

## **Build Pipeline**

1. Geração de sitemaps.
2. Geração de ads.txt.
3. Geração de arquivos SCSS.
4. Sincronização de arquivos públicos.
5. Limpeza de arquivos antigos de GitHub Actions.
6. Agendamento de posts.

## **Post Build GitHub Actions**

1. Agendamento de posts.
2. Atualização de conteúdo.

# Integrações e Tecnologias de Desenvolvimento

- **Decap CMS**: Gerenciamento de conteúdo simplificado.
- **SendGrid**: Para necessidades de marketing por email.
- **Google Tag Manager e AdSense**: Gerenciamento de tags e monetização.

# Pré-requisitos

1. **Node.js**: Requer versão >= 20.12.2.
2. **NPM**: Requer versão >= 7.0.0.
3. **Configuração .env**:
   - `CHATGPT_API_KEY` para integração com ChatGPT.
   - `CLOUDINARY_API_SECRET` para suporte a Cloudinary.
4. **Token do GitHub**: `secrets.PAT` para permitir automações.

# Tipos de Instalação e Uso

- **GitHub Workflow**: Automação de tarefas diretamente no CI/CD pipeline do GitHub.
- **package.json**: Scripts locais integrados no projeto.
- **npx**: Execução direta para tarefas rápidas sem instalação.
- **Classe JS**: Uso programático em projetos personalizados.

# Digest It - Resumo do Projeto

## **Principais Serviços**

- **GitHub**: Integração nativa com repositórios e workflows.
- **GitHub Actions**: Tarefas automatizadas e gatilhos configuráveis.
- **Static Files**: Geração de arquivos estáticos, sitemaps e feeds.
- **Cloudinary**: Suporte à automação de importação de imagens.
- **ChatGPT**: Criação de conteúdo com IA.

## **Pipeline Principal do Digest It**

| Ordem | Nome do Processo        | Descrição                               |
| ----- | ----------------------- | --------------------------------------- |
| 1     | Initialization          | Configuração do ambiente.               |
| 2     | Processing Inputs       | Validação e processamento de dados.     |
| 3     | AI Content Generator    | Geração de conteúdo com IA.             |
| 4     | Export Static Files     | Exportação de arquivos estáticos.       |
| 5     | Utilities               | Métodos auxiliares para várias tarefas. |
| 6     | Automation & Scheduling | Automação e agendamento de processos.   |
| 7     | Sync                    | Sincronização de arquivos.              |

## **Interface de GitHub Actions**

| Funcionalidade  | Descrição                                 |
| --------------- | ----------------------------------------- |
| Watcher         | Observa pastas para iniciar workflows.    |
| Trigger         | Monitora arquivos para gatilhos.          |
| Schedule        | Executa cron jobs para posts agendados.   |
| Auto Post       | Automatiza postagens periódicas com GPT.  |
| Auto Post 2     | Automatiza postagens agendadas com GPT.   |
| Actions Logs    | Registra atividades de workflows.         |
| Trigger Updates | Atualiza baseando-se em ações disparadas. |

# Exemplos de Uso

## **Via npx**

```bash
npx digest-it update
```

## **No package.json**

```json
"scripts": {
  // Formas de usar
  "update": "node ./node_modules/digest-it/triggers/post-update.js", // root local project
  "update": "node ../node_modules/digest-it/triggers/post-update.js", // inside workspace
  "update": "npx digest-it update", // using npx
  "update": "npm digest-it update", // using npm
  // (...)
  // Next.JS
  "dev": "node ./node_modules/digest-it/triggers/build.js && next dev",
  "build": "node ./node_modules/digest-it/triggers/build.js && next build",
  // Outros gatilhos
  "digest": "node ./node_modules/digest-it/triggers/digest.js",
  "atom": "node ./node_modules/digest-it/triggers/atom.js",
  "autogpt": "node ./node_modules/digest-it/triggers/chatGPT-auto.js",
  "chatgpt": "node ./node_modules/digest-it/triggers/chatGPT.js",
  "content": "node ./node_modules/digest-it/triggers/content.js",
  "decap": "node ./node_modules/digest-it/triggers/decap.js",
  "schedule": "node ./node_modules/digest-it/triggers/post-schedule.js",
  "rss": "node ./node_modules/digest-it/triggers/rss.js",
  "sass": "node ./node_modules/digest-it/triggers/sass.js",
  "sitemaps": "node ./node_modules/digest-it/triggers/sitemaps.js",
  "stories": "node ./node_modules/digest-it/triggers/amp-stories.js",
  "static": "node ./node_modules/digest-it/triggers/static.js",
  "workflows": "node ./node_modules/digest-it/triggers/workflows.js"
}
```

Execute com:

```bash
npm run update
```

## **GitHub Actions Workflow**

```yaml
- name: Update posts content
  run: npm run update
```

## **Classe JS**

```javascript
const DigestPipeline = require("digest-it");
const pipeline = new DigestPipeline(
  {
    staticFiles: {
      indexSitemap: true,
      postSitemap: true,
      feedsSitemaps: true,
      rss: true,
      atom: true,
    },
    finalPipe: { syncPublicFolder: true },
  },
  {},
  null,
  false,
  true
);
pipeline.run();
```

# Vantagens Comerciais

- **Tecnologias Gratuitas**: Utilize tecnologias de código aberto sem custos adicionais.
- **Fácil Manutenção**: Código inteligente e técnicas low-code.
- **Alto Desempenho**: Aplicações rápidas e escaláveis.
- **SEO Excelente**: Otimização integrada para melhor ranking nos motores de busca.
- **Automação**: Workflows automatizados para aumentar a eficiência.
