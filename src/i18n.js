import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            portfolio: 'Portfolio',
            experience: 'Experience',
            contact: 'Contact'
          },
          hero: {
            title: 'Fullstack Web & Mobile Developer',
            subtitle: 'I engineer scalable web ecosystems and high-performance native Android applications with a focus on precision and user experience.',
            cta: 'View Portfolio',
            status: 'Available for new projects'
          },
          expertise: {
            web: {
              title: 'Fullstack Web Development',
              desc: 'Building robust, end-to-end web applications with React, Node.js, Python, and PostgreSQL. Focused on performance and scalability.'
            },
            mobile: {
              title: 'Mobile Development',
              desc: 'Native Android development using Kotlin and Jetpack Compose. Delivering fluid, high-performance mobile experiences.'
            }
          },
          experience: {
            title: 'Professional Experience',
            award_badge: '2025 Award Winner',
            view_details: 'View Details',
            nativa: {
              role: 'Fullstack Web Developer',
              company: 'Nativa IA',
              period: 'Jul 2025 – Present',
              location: 'Remote / On-site',
              description: 'Collaborative development of high-impact AI solutions for the Brazilian public sector.',
              lia: 'On-site development of LIA (AI Bidding) at the Regional Electoral Court - AC, using JavaScript, Tailwind CSS, Python (FastAPI), and PostgreSQL, featuring API integration and database persistence.',
              auditoria: 'Development of Nativa Auditoria, an application for automated generation of audit documents using AI for analysis and structuring of administrative and legal data. A collaborative project between Regional Electoral Courts (TREs) and State Courts (TJs), winner of the 2025 CNJ Audit Value Generation Award (Axis I).',
              bi: 'On-site frontend development and deployment of BI (Business Intelligence) dashboards for the Regional Electoral Court - RO intranet.'
            },
            education: {
              title: 'Academic Background',
              uninter: {
                degree: 'B.S. in Computer Engineering',
                period: '2018 – 2024',
                school: 'UNINTER'
              }
            }
          },
          portfolio: {
            title: 'Portfolio',
            web_section: 'Web Applications',
            mobile_section: 'Mobile Applications',
            debrid: {
              title: 'Debrid Searcher',
              desc: 'Web interface for searching torrents via Torznab indexers and instantly verifying cache status on TorBox.',
              specs_list: ["React / TypeScript", "Node.js Backend", "Torznab Integration", "Dockerized"]
            },
            chatbot: {
              title: 'Chatbot RAG',
              desc: 'AI Chatbot application with Retrieval-Augmented Generation (RAG) capabilities using FastAPI and PostgreSQL.',
              specs_list: ["FastAPI / Python", "PostgreSQL + pgvector", "RAG / LLM Integration", "Docker Compose"]
            },
            remedi: {
              title: 'Remedi',
              desc: 'Precision medicine tracking engine built for Android to manage long-term treatments.',
              specs_list: ["Kotlin / MVVM", "Room Database", "XML Layouts", "Local Persistence"]
            },
            ainformation: {
              title: 'AInformation',
              desc: 'Android demonstration app that generates AI-powered news summaries from RSS feeds.',
              specs_list: ["Kotlin / Compose", "Gemini AI SDK", "RSS Feed Integration", "Hilt DI"]
            },
            specs: 'Core Specifications',
            github: 'Github',
            playstore: 'Play Store',
            privacy: 'Privacy Policy',
            project_label: {
              web: 'Web Project',
              mobile: 'Mobile Project'
            }
          },
          footer: {
            rights: 'All rights reserved.',
            connect: 'Contact',
            privacy: 'Privacy'
          },
          policy: {
            title: 'Privacy Policy',
            intro_title: 'Introduction',
            intro: 'Welcome to Remedi, developed by VSM Development. Your privacy is important to us. This Privacy Policy explains how our app handles personal data in accordance with the General Data Protection Regulation (GDPR).',
            collection_title: 'Data Collection and Use',
            collection: 'We do not directly collect or store personal data. However, our app uses third-party services that may collect data to improve functionality, serve ads, and analyze app performance.',
            storage_title: 'Data Storage & Backup',
            storage: 'We do not store any user data locally or on external servers. However, Google may automatically back up app-related data as part of their services.'
          }
        }
      },
      pt: {
        translation: {
          nav: {
            home: 'Início',
            portfolio: 'Portfólio',
            experience: 'Experiência',
            contact: 'Contato'
          },
          hero: {
            title: 'Desenvolvedor Fullstack Web & Mobile',
            subtitle: 'Desenvolvo ecossistemas web escaláveis e aplicativos Android nativos de alta performance com foco em precisão e experiência do usuário.',
            cta: 'Ver Portfólio',
            status: 'Disponível para novos projetos'
          },
          expertise: {
            web: {
              title: 'Desenvolvimento Web Fullstack',
              desc: 'Construindo aplicações web robustas de ponta a ponta com React, Node.js, Python e PostgreSQL. Foco em performance e escalabilidade.'
            },
            mobile: {
              title: 'Desenvolvimento Mobile',
              desc: 'Desenvolvimento Android nativo usando Kotlin e Jetpack Compose. Entregando experiências móveis fluidas e de alta performance.'
            }
          },
          experience: {
            title: 'Experiência Profissional',
            award_badge: 'Vencedor do Prêmio Geração de Valor 2025',
            view_details: 'Ver Detalhes',
            nativa: {
              role: 'Desenvolvedor Web Fullstack',
              company: 'Nativa IA',
              period: 'Jul 2025 – Presente',
              location: 'Remoto / Presencial',
              description: 'Desenvolvimento colaborativo de soluções de IA de alto impacto para o setor público brasileiro.',
              lia: 'Desenvolvimento presencial da aplicação LIA (Licitações com IA) no Tribunal Regional Eleitoral - AC, utilizando JavaScript, Tailwind CSS, Python (FastAPI) e PostgreSQL, com integração de APIs e persistência em banco de dados.',
              auditoria: 'Desenvolvimento da aplicação Nativa Auditoria, voltada à geração automatizada de documentos de auditoria, empregando inteligência artificial para análise e estruturação de informações administrativas e jurídicas. Projeto colaborativo entre Tribunais Regionais Eleitorais (TREs) e Tribunais de Justiça (TJs), vencedor do Prêmio Auditoria de Geração de Valor 2025 (Eixo I) do CNJ.',
              bi: 'Desenvolvimento presencial do frontend e implantação de uma aplicação de painéis de BI (Business Intelligence) na intranet do Tribunal Regional Eleitoral - RO.'
            },
            education: {
              title: 'Formação Acadêmica',
              uninter: {
                degree: 'Bacharelado em Engenharia da Computação',
                period: '2018 – 2024',
                school: 'UNINTER'
              }
            }
          },
          portfolio: {
            title: 'Portfólio',
            web_section: 'Aplicações Web',
            mobile_section: 'Aplicações Mobile',
            debrid: {
              title: 'Debrid Searcher',
              desc: 'Interface web para busca de torrents via indexadores Torznab e verificação instantânea de cache no TorBox.',
              specs_list: ["React / TypeScript", "Backend Node.js", "Integração Torznab", "Dockerizado"]
            },
            chatbot: {
              title: 'Chatbot RAG',
              desc: 'Aplicação de Chatbot de IA com capacidades de Retrieval-Augmented Generation (RAG) usando FastAPI e PostgreSQL.',
              specs_list: ["FastAPI / Python", "PostgreSQL + pgvector", "Integração RAG / LLM", "Docker Compose"]
            },
            remedi: {
              title: 'Remedi',
              desc: 'Mecanismo de rastreamento de medicamentos de precisão para Android, projetado para gerenciar tratamentos de longo prazo.',
              specs_list: ["Kotlin / MVVM", "Banco de Dados Room", "Layouts XML", "Persistência Local"]
            },
            ainformation: {
              title: 'AInformation',
              desc: 'Aplicativo Android de demonstração que gera resumos de notícias por IA a partir de feeds RSS.',
              specs_list: ["Kotlin / Compose", "SDK de IA Gemini", "Integração Feed RSS", "Injeção de Dependência Hilt"]
            },
            specs: 'Especificações Principais',
            github: 'Github',
            playstore: 'Play Store',
            privacy: 'Política de Privacidade',
            project_label: {
              web: 'Projeto Web',
              mobile: 'Projeto Mobile'
            }
          },
          footer: {
            rights: 'Todos os direitos reservados.',
            connect: 'Contato',
            privacy: 'Privacidade'
          },
          policy: {
            title: 'Política de Privacidade',
            intro_title: 'Introdução',
            intro: 'Bem-vindo ao Remedi, desenvolvido pela VSM Development. Sua privacidade é importante para nós. Esta Política de Privacidade explica como nosso aplicativo lida com dados pessoais de acordo com o Regulamento Geral de Proteção de Dados (GDPR).',
            collection_title: 'Coleta e Uso de Dados',
            collection: 'Não coletamos nem armazenamos dados pessoais diretamente. No entanto, nosso aplicativo usa serviços de terceiros que podem coletar dados para melhorar a funcionalidade, exibir anúncios e analisar o desempenho do aplicativo.',
            storage_title: 'Armazenamento e Backup de Dados',
            storage: 'Não armazenamos nenhum dado do usuário localmente ou em servidores externos. No entanto, o Google pode fazer backup automático de dados relacionados ao aplicativo como parte de seus serviços.'
          }
        }
      }
    }
  });

export default i18n;
