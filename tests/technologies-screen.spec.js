import { test, expect } from '@playwright/test';

test.describe('Testes da Página de Tecnologias', () => {

  // Este bloco é executado ANTES de cada teste deste arquivo.
  // Ele garante que sempre começamos na página correta.
  test.beforeEach(async ({ page }) => {
    // 1. Vai para a página inicial
    await page.goto('https://icomphub-staging.nelsul.com/');

    // 2. Clica no botão "Tecnologias" no menu principal para navegar
    console.log('Navegando para a página de Tecnologias...');
    await page.getByText('Tecnologias', { exact: true }).click();

    // 3. (Opcional, mas recomendado) Espera que a URL mude para confirmar a navegação
    await expect(page).toHaveURL(/.*technologies/);
    console.log('Navegação para a página de Tecnologias concluída.');
  });

  test('deve exibir o título e clicar no botão "Nova Tecnologia"', async ({ page }) => {
    // --- Arrange: Definir os localizadores para os elementos que vamos usar ---
    
    // O título da página. getByRole é mais específico e robusto para títulos.
    const pageTitle = page.getByRole('heading', { name: 'Tecnologias' });

    // O botão que queremos encontrar e clicar.
    const newTechButton = page.getByRole('button', { name: 'Nova Tecnologia' });

    // --- Act & Assert: Agir na página e verificar os resultados ---

    // 1. Detecta o título da página para garantir que estamos no lugar certo.
    console.log('Verificando se o título "Tecnologias" está visível...');
    await expect(pageTitle).toBeVisible();

    // 2. Detecta o botão "Nova Tecnologia".
    // Se o botão não estiver visível, o teste irá falhar aqui, o que está correto.
    console.log('Verificando se o botão "Nova Tecnologia" está visível...');
    await expect(newTechButton).toBeVisible();

    // 3. Se o passo anterior passou, significa que o botão está presente. Agora, clique nele.
    console.log('Botão encontrado. Clicando nele...');
    await newTechButton.click();

    // 4. (Passo extra e crucial) Verificar o resultado da ação.
    // Após clicar em "Nova Tecnologia", esperamos que um formulário ou um novo título apareça.
    // Este seletor é um palpite, você pode precisar ajustá-lo para o que realmente aparece.
    console.log('Verificando se o formulário de cadastro de tecnologia apareceu...');
    const formTitle = page.getByRole('heading', { name: 'Cadastrar Tecnologia' });
    await expect(formTitle).toBeVisible();

  });

  test('deve preencher e cadastrar uma nova tecnologia', async ({ page }) => {

  // instanciando novamente o titulo da pagina 'tecnologias', agora dessa vez para preencher o formulario
  const pageTitle = page.getByRole('heading', { name: 'Tecnologias' });
  const newTechButton = page.getByRole('button', { name: 'Nova Tecnologia' });

  // usando uma expressão regular para encontrar o placeholder.
  // isso é mais robusto contra espaços extras ou diferenças de maiúsculas/minúsculas.
  const nameInput = page.getByPlaceholder(/digite o nome da tecnologia/i);

  // localiza o botão de submissão do formulário
  const submitButton = page.getByRole('button', { name: 'Cadastrar' });
  
  
  await expect(pageTitle).toBeVisible();
  await expect(newTechButton).toBeVisible();
  await newTechButton.click();

  // o .fill() é inteligente. ele espera o elemento aparecer, clica, limpa e preenche.
  // não precisamos mais do .click() separado.
  await nameInput.fill('Tecnologia Teste');
  console.log("preencheu --------------")

  // verificamos se o valor foi de fato inserido no campo
  await expect(nameInput).toHaveValue('Tecnologia Teste');
  
  // clica no botão para submeter o formulário
  await submitButton.click();
  console.log("cadastrou ---------------")

  // depois, verificamos a consequência de clicar em 'cadastrar'.
  // esperamos que o formulário desapareça após o cadastro.
});
});