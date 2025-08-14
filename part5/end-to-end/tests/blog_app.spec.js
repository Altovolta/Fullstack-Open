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

    await request.post('/api/users', {
      data : {
        name: 'Ronaldo Nazario',
        username: 'Ronaldo',
        password: 'securePass2'
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


      test('it cannot be deleted by a user that did not create it', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await helper.loginWith(page, 'Ronaldo', 'securePass2')

        await page.getByRole('button', { name: 'view' }).click()
        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
      
    })

    describe('and multiple blogs with likes exist', () => {
      beforeEach(async ({ page }) => {
        await helper.createBlogWith(page, 'un titulo', 'un autor', 'http://url.com')
        await helper.createBlogWith(page, 'otro titulo', 'otro autor', 'http://url2.com')
        await helper.createBlogWith(page, 'uno mas', 'lorem ipsum', 'http://url3.com')
        
        await helper.likeBlogWith(page, 'un titulo', 'un autor', 0)
        await helper.likeBlogWith(page, 'otro titulo', 'otro autor', 2)
        await helper.likeBlogWith(page, 'uno mas', 'lorem ipsum', 1)
        
      })

      test('blogs are sorted by amount of likes', async ({ page }) => {
        const likesLocators = await page.locator('.blogDiv')
        .filter({hasText: 'likes'}).all()

        const likes = []
        for (const likeElement of likesLocators) {
          const text = await likeElement.getByText('likes').textContent()
          const textNum = text.replace(/[^0-9]+/g, "");
          likes.push(parseInt(textNum))  
        }
        
        const sortedLikes = [...likes].sort((blog1Likes, blog2Likes) => blog2Likes - blog1Likes)
        expect(likes).toEqual(sortedLikes)
      })
    })
  })
})
