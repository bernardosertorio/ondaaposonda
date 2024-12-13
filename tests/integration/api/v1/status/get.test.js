test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(response.status).toBe(200);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(typeof responseBody.dependencies.database.version).toBe("string");
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe("16.6");

  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);

  expect(typeof responseBody.dependencies.database.opened_connections).toBe(
    "number",
  );
  const maxConnections = 100;
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  expect(
    responseBody.dependencies.database.opened_connections,
  ).toBeLessThanOrEqual(maxConnections);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
