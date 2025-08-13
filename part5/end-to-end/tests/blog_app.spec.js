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
})
