const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const formLocator = await page.getByTestId('login-form')
    console.log(formLocator)
    expect(formLocator).toBeVisible()

  })
})
