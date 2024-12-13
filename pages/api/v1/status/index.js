import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const version = await database.query("SHOW server_version;");
  const versionNumber = version.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsNumbers = parseInt(
    maxConnections.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const activeConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const activeConnectionsNumber = activeConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        status: "",
        max_connections: maxConnectionsNumbers,
        opened_connections: activeConnectionsNumber,
        version: versionNumber,
      },
    },
  });
}

export default status;
