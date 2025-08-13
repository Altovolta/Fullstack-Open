
const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlogWith = async (page, title, author, url) => {
    await page.getByRole('button', {name: 'create new blog'}).click()
    await page.getByTestId('titleInput').fill(title)
    await page.getByTestId('authorInput').fill(author)
    await page.getByTestId('urlInput').fill(url)
    await page.getByRole('button', {name: 'create'}).click()

    await page.locator('.blogDiv').waitFor()
}

export { loginWith, createBlogWith }