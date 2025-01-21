const { exec } = require("node:child_process");

let contador = 0;
let relogio = ["|", "/", "–", "\\"];

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(
        `\r${relogio[contador % relogio.length]} ⌛ Aguardando PostgreSQL aceitar conexões...`,
      );
      contador++;
      setTimeout(checkPostgres, 250);

      return;
    }

    console.log("\n✅ Postgres está pronto e aceitando conexões! \n");
  }
}

checkPostgres();
