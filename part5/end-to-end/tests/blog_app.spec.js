const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data : {
        name: 'Pedro Ibaniez',
        username: 'Pepito',
        password: 'securePass'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {

    const formLocator = await page.getByTestId('login-form')
    console.log(formLocator)
    expect(formLocator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      helper.loginWith(page, 'Pepito', 'securePass')
      await expect(page.getByText('Pedro Ibaniez logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      helper.loginWith(page, 'Pepito', 'wrongPass')

      const notificationDiv = page.locator('.notification')
      await expect(notificationDiv).toContainText('invalid credentials')
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')
      await expect(notificationDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      helper.loginWith(page, 'Pepito', 'securePass')
    })

    test('a new blog can be created', async ({ page }) => {
      await helper.createBlogWith(page, 'un titulo', 'un autor', 'http://url.com')

      const notificationDiv = page.locator('.notification')
      await expect(notificationDiv).toContainText("A new blog 'un titulo' by un autor added")
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')
      await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await helper.createBlogWith(page, 'un titulo', 'un autor', 'http://url.com')
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByTestId('blogLikes')).toContainText('likes 1')
      })

      test('it can be deleted by the user that created it', async ({ page }) => {

        page.on('dialog', async (dialog) => await dialog.accept())

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        const notificationDiv = page.locator('.notification')
        await expect(notificationDiv).toContainText("Blog 'un titulo' deleted")
        await expect(notificationDiv).toHaveCSS('border-style', 'solid')
        await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      })
    })
})
})
