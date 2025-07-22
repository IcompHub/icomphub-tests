import { test, expect } from '@playwright/test';

test.describe('Teste da tela de projetos', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://icomphub-staging.nelsul.com/');

        console.log('Navegando para a página de Projetos...');
        await page.getByText('Projetos', { exact: true }).click();

        await expect(page).toHaveURL(/.*project/);
        console.log('Navegação para a página de Projetos concluída.');
    }) 

    test('deve exibir o título da página e clicar em "Projetos"', async ({ page }) => {
        const pageTitle = page.getByRole('heading', { name: 'Projetos' });

        await expect(pageTitle).toBeVisible();
        
    });
})