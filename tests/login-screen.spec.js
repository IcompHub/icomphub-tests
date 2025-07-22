import { test, expect } from '@playwright/test';

test.describe('testes da página de login', () => {

  test('deve preencher os campos de login e submeter o formulário', async ({ page }) => {
    // -- setup: navegar e abrir o modal de login --
    
    // navega para a página inicial
    await page.goto('https://icomphub-staging.nelsul.com/');

    // clica no botão "entrar" do cabeçalho para abrir o modal
    // usamos getByRole para o botão principal da página
    await page.getByRole('button', { name: 'Entrar' }).first().click();

    // uma boa prática é esperar que o título do modal "entrar" esteja visível
    await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible();

    // -- arrange: localizar os elementos do formulário --

    // localiza os campos pelos seus respectivos placeholders, como solicitado
    const emailInput = page.getByPlaceholder('Email de acesso');
    const passwordInput = page.getByPlaceholder('Senha');
    
    // localiza o botão de submissão do formulário dentro do modal
    // aqui usamos .last() para garantir que estamos pegando o botão do modal, e não o do cabeçalho
    const submitButton = page.getByRole('button', { name: 'Entrar' }).last();

    // -- act: preencher os campos --

    // preenche os campos com dados de teste
    await emailInput.fill('nelson.dev@test.com');
    await passwordInput.fill('123456');

    // -- assert: verificar o preenchimento e o resultado --
    
    // verifica se os campos foram preenchidos corretamente
    await expect(emailInput).toHaveValue('nelson.dev@test.com');
    await expect(passwordInput).toHaveValue('123456');

    // clica no botão para enviar o formulário
    await submitButton.click();

    // verifica a consequência do login bem-sucedido
    // esperamos ser redirecionados para a página de projetos.
    await expect(page).toHaveURL(/.*project/);
  });
});