import { test, expect } from "@playwright/test";

test.describe('Reqres API CRUD operations', () => {

  // Define your headers as an object
  const customHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1'
  };

  // GET
  test('GET: List users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users', {headers: customHeaders});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.data.length).toBeGreaterThan(0); // Ensure there are users in the response
    expect(Array.isArray(users.data)).toBeTruthy();// Ensure data is an array.
  });

  // GET single user
  test('GET: Single user', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/12', {
      headers: {
        'content-type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    })// Ensure the request is made with the correct headers

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.data.id).toBe(12);// Ensure the user ID matches
  });

  // POST
  test('POST: Create user', async ({ request }) => {
    const newUser = { name: 'Luffy', job: 'Pirate' };
    const response = await request.post('https://reqres.in/api/users', {headers: customHeaders, data: newUser});
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.name).toBe('Luffy');
  });

  // PUT (complete update)
  test('PUT: Update user', async ({ request }) => {
    const updatedUser = { name: 'Raghav', job: 'Teacher' };
    const response = await request.put('https://reqres.in/api/users/2', {headers: customHeaders, data: updatedUser});
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('Raghav');
  });

  // PATCH (partial update)
  test('PATCH: Partially update user', async ({ request }) => {
    const partialUpdate = { job: 'Engineer' };
    const response = await request.patch('https://reqres.in/api/users/2', {headers: customHeaders, data: partialUpdate});
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.job).toBe('Engineer');
  });

  // DELETE
  test('DELETE: Remove user', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2', {headers: customHeaders});
    expect(response.status()).toBe(204); // No content expected after successful delete

  });

});
